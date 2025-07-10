"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Block, BlockComponentProps, Page } from "@/types";
import { supabase } from "@/lib/supabaseClient";

type EditorProps = { page: Page; blocks: Block[] };

export default function Editor({ page, blocks: initialBlocks }: EditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

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

  return (
    <>
      <header>
        <h1 className="font-bold text-3xl">{page.title || "Untitled"}</h1>
        <hr className="mt-4 border-b-1 rounded-lg border-muted-foreground" />
      </header>

      <section>
        {blocks.map((block) => {
          switch (block.type) {
            case "heading":
              return <BlockHeading key={block.id} block={block} />;
            case "paragraph":
              return <BlockParagraph key={block.id} block={block} />;
            case "todo":
              return <BlockToDo key={block.id} block={block} />;
            default:
              return null;
          }
        })}
      </section>

      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 py-1 px-4 my-4 border-muted-foreground border-2 rounded-lg transition-all hover:cursor-pointer hover:opacity-85">
            <h6 className="text-sm font-medium">Add Blocks</h6>
            <Plus className="size-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
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
    </>
  );
}

const BlockToDo = ({ block }: BlockComponentProps) => (
  <div className="flex items-center space-x-2 my-1.5">
    <Checkbox id={block.id} />
    <Label htmlFor={block.id}>{block.content}</Label>
  </div>
);

const BlockHeading = ({ block }: BlockComponentProps) => (
  <div className="flex items-center gap-2 my-2 p-2 rounded-lg hover:bg-accent">
    <div className="border-l-2 border-ring h-6" />
    <h1 className="font-medium text-xl">{block.content}</h1>
  </div>
);

const BlockParagraph = ({ block }: BlockComponentProps) => (
  <p className="px-2 py-1 rounded-lg hover:bg-accent">{block.content}</p>
);
