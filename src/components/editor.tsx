"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { Block, BlockComponentProps, EditorProps } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import AITools from "./ai-tools";
import { toast } from "sonner";

export default function Editor({ page, blocks: initialBlocks, profile }: EditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(page.title || "Untitled");
  const [isReordering, setIsReordering] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<Block["type"] | null>(null);
  const router = useRouter();

  const handleUpdateTitle = async () => {
    const { error } = await supabase
      .from("pages")
      .update({ title: titleValue })
      .eq("id", page.id);

    if (error) {
      console.error("Failed to update page title:", error);
      return;
    }

    router.refresh();
    setIsEditingTitle(false);
  };

  const handleDelete = async (blockId: string) => {
    const {error} = await supabase
      .from("blocks")
      .delete()
      .eq("id", blockId);
    
      if (error) {
        console.error(error);
        return;
      }
      
      setBlocks((prev) => prev.filter((block) => block.id !== blockId));
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdateTitle();
    } else if (e.key === "Escape") {
      setIsEditingTitle(false);
      setTitleValue(page.title || "Untitled");
    }
  };

  const addBlock = async (type: Block["type"]) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      page_id: page.id,
      type,
      content: "New " + type,
      position: blocks.length,
    };
    const { error } = await supabase.from("blocks").insert(newBlock);
    if (error) {
        console.error("Failed to insert block:", error);
        return;
    }

    setBlocks((prev) => [...prev, newBlock]);
  };

  const handleUpdate = async (blockId: string, newContent: string) => {
    const { error } = await supabase
      .from("blocks")
      .update({ content: newContent })
      .eq("id", blockId);

    if (error) {
      console.error("Failed to update block:", error);
      return;
    }

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, content: newContent } : block
      )
    );
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(blocks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const updatedBlocks = reordered.map((block, index) => ({ ...block, position: index }));

    setBlocks(updatedBlocks);

    const updates = updatedBlocks.map(({ id, position }) => ({ id, position }));
    const { error } = await supabase.from("blocks").upsert(updates, { onConflict: 'id'});

    if (error) {
      console.error("Reorder error:", error);
    } else {
      console.log("Reorder success!", updates);
    }
  };
  
  return (
    <main className="px-8 sm:px-6 xl:px-2">
      <header className="flex items-center gap-2 group">
          {isEditingTitle ? (
            <>
              <input
                className="font-bold text-2xl sm:text-3xl bg-transparent border-b outline-none"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                onKeyDown={handleTitleKeyDown}
                autoFocus
              />
              <Check className="size-6 ml-2 cursor-pointer" onClick={handleUpdateTitle} />
            </>
          ) : (
            <>
              <h1 className="font-bold text-2xl sm:text-3xl"> {titleValue || "Untitled"} </h1>
              <Pencil className="size-5 ml-2 opacity-0 group-hover:opacity-50 hover:opacity-80 transition-all cursor-pointer" onClick={() => setIsEditingTitle(true)} />
            </>
          )}
      </header>
      <hr className="mt-4 border-b-1 rounded-lg border-muted-foreground" />

      <AITools blocks={blocks} profile={profile} />

      {isReordering ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <section ref={provided.innerRef} {...provided.droppableProps}>
                {blocks.map((block, index) => {
                  const commonProps = { block, onUpdate: handleUpdate, onDelete: handleDelete };

                  return (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="px-2 my-2 border-1 rounded"
                        >
                          {block.type === "heading" && <BlockHeading {...commonProps} />}
                          {block.type === "paragraph" && <BlockParagraph {...commonProps} />}
                          {block.type === "todo" && <BlockToDo {...commonProps} />}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <section>
          {blocks.map((block) => {
            const commonProps = { block, onUpdate: handleUpdate, onDelete: handleDelete };

            return (
              <div key={block.id}>
                {block.type === "heading" && <BlockHeading {...commonProps} />}
                {block.type === "paragraph" && <BlockParagraph {...commonProps} />}
                {block.type === "todo" && <BlockToDo {...commonProps} />}
              </div>
            );
          })}
        </section>
      )}

      <div className="flex justify-end gap-2 my-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <h6 className="text-sm">Add Blocks</h6>
              <Plus className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="text-left">
              <DialogTitle>Add Blocks</DialogTitle>
              <DialogDescription>Pick a block to create</DialogDescription>
            </DialogHeader>
            <Select onValueChange={(value) => setSelectedBlockType(value as Block["type"])}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Block" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Blocks</SelectLabel>
                  <SelectItem value="heading">Heading</SelectItem>
                  <SelectItem value="paragraph">Paragraph</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button 
                onClick={async () => {
                  if (selectedBlockType) {
                    await addBlock(selectedBlockType);
                  }
                }}
                disabled={!selectedBlockType}
              >
                Add Block
              </Button>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setSelectedBlockType(null)}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          onClick={() => {
            if (profile.subscription_tier === "free") {
              toast.warning("Reorder is only available for Pro and Creator plans.");
              return;
            }
            setIsReordering(!isReordering);
          }}
        >
          {isReordering ? "Stop Reordering" : "Reorder Blocks"}
        </Button>
      </div>
    </main>
  );
}

const BlockToDo = ({ block, onUpdate, onDelete }: BlockComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(block.content);
  
  const handleSave = async () => {
    await onUpdate(block.id, value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(block.content);
    }
  };
  
  return (
    <div className="flex items-center gap-4 group">
      <div className="flex items-center space-x-2.5 my-1">
        <Checkbox id={block.id} />
        {isEditing ? (
          <>
            <input
              className="font-medium text-sm sm:text-base bg-transparent border-b outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Check className="size-5 ml-4 cursor-pointer" onClick={handleSave} />
          </>
        ) : (
          <>
            <Label className="text-sm sm:text-base font-normal" htmlFor={block.id}>{block.content}</Label>
            <div className="flex items-center ml-2 shrink-0">
              <Pencil className="size-4 cursor-pointer hover:opacity-80 sm:opacity-0 sm:group-hover:opacity-50" onClick={() => setIsEditing(true)} />
              <Trash2 className="size-4 ml-2 cursor-pointer hover:opacity-80 sm:opacity-0 sm:group-hover:opacity-50 hover:text-red-500" onClick={() => onDelete(block.id)} />
            </div>
          </>  
        )}
      </div>
    </div>
  );
};

const BlockHeading = ({ block, onUpdate, onDelete }: BlockComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(block.content);

  const handleSave = async () => {
    await onUpdate(block.id, value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(block.content);
    }
  };

  return (
    <div className="flex items-center gap-2 my-2 p-2 rounded-lg group">
      <div className="border-l-2 border-ring h-6" />
      {isEditing ? (
        <>
          <input
            className="font-medium text-lg sm:text-xl bg-transparent border-b outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Check className="size-5 ml-4 cursor-pointer" onClick={handleSave} />
        </>
      ) : (
        <>
          <h1 className="font-medium text-lg sm:text-xl">{block.content}</h1>
          <div className="flex items-center ml-2 shrink-0">
            <Pencil className="size-4 cursor-pointer hover:opacity-80 sm:opacity-0 sm:group-hover:opacity-50" onClick={() => setIsEditing(true)} />
            <Trash2 className="size-4 ml-2 cursor-pointer hover:opacity-80 sm:opacity-0 sm:group-hover:opacity-50 hover:text-red-500" onClick={() => onDelete(block.id)} />
          </div>
        </>
      )}
    </div>
  );
};

const BlockParagraph = ({ block, onUpdate, onDelete }: BlockComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(block.content);

  const handleSave = async () => {
    await onUpdate(block.id, value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(block.content);
    }
  };

  return (
    <div className="flex items-center my-1 group">
      {isEditing ? (
        <>
          <input
            className="sm:text-lg font-medium px-2 py-1 bg-transparent border-b outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Check className="size-5 ml-4 cursor-pointer" onClick={handleSave} />
        </>
      ) : (
        <>
          <p className="sm:text-lg px-2 py-1 rounded-lg">{block.content}</p>
          <div className="flex items-center ml-2 shrink-0">
            <Pencil className="size-4 cursor-pointer hover:opacity-80 sm:opacity-0 sm:group-hover:opacity-50" onClick={() => setIsEditing(true)} />
            <Trash2 className="size-4 ml-2 cursor-pointer hover:opacity-80 sm:opacity-0 sm:group-hover:opacity-50 hover:text-red-500" onClick={() => onDelete(block.id)} />
          </div>
        </>
      )}
    </div>
  );
};
