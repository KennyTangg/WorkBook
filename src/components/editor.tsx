"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Pencil, Plus } from "lucide-react";
import { Block, BlockComponentProps, Page } from "@/types";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type EditorProps = { page: Page; blocks: Block[] };

export default function Editor({ page, blocks: initialBlocks }: EditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(page.title || "Untitled");
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

      <section>
        {blocks.map((block) => {
          const commonProps = { block, onUpdate: handleUpdate };
          switch (block.type) {
            case "heading":
              return <BlockHeading key={block.id} {...commonProps} />;
            case "paragraph":
              return <BlockParagraph key={block.id} {...commonProps} />;
            case "todo":
              return <BlockToDo key={block.id} {...commonProps} />;
            default:
              return null;
          }
        })}
      </section>

      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 py-1 px-4 my-4 border-muted-foreground border-1 rounded-lg transition-all hover:cursor-pointer hover:opacity-85">
            <h6 className="text-sm">Add Blocks</h6>
            <Plus className="size-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-left">
            <DialogTitle>Add Blocks</DialogTitle>
            <DialogDescription>Pick a block to create</DialogDescription>
          </DialogHeader>
          <Select onValueChange={addBlock}>
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
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

const BlockToDo = ({ block, onUpdate }: BlockComponentProps) => {
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
      <div className="flex items-center space-x-2.5 my-1.5">
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
            <Pencil className="size-4 ml-4 opacity-0 cursor-pointer hover:opacity-80 group-hover:opacity-50" onClick={() => setIsEditing(true)} />
          </>  
        )}
      </div>
    </div>
  );
};

const BlockHeading = ({ block, onUpdate }: BlockComponentProps) => {
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
          <Pencil className="size-4 ml-4 opacity-0 cursor-pointer hover:opacity-80 group-hover:opacity-50" onClick={() => setIsEditing(true)} />
        </>
      )}
    </div>
  );
};

const BlockParagraph = ({ block, onUpdate }: BlockComponentProps) => {
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
    <div className="flex items-center my-2 group">
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
          <p className="sm:text-lg px-2 py-1 rounded-lg hover:bg-accent">{block.content}</p>
          <Pencil className="size-4 ml-4 opacity-0 cursor-pointer hover:opacity-80 group-hover:opacity-50" onClick={() => setIsEditing(true)} />
        </>
      )}
    </div>
  );
};
