"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Block, BlockComponentProps, BlockToDoComponentProps, ToDoBlock  } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

const initialBlocks: Block[] = [
    { id: '1', type: 'heading', content: 'My Dynamic To-Do List' },
    { id: '2', type: 'todo', content: 'Delete the old static JSX', checked: true },
    { id: '3', type: 'todo', content: 'Render from an array instead', checked: false },
    { id: '4', type: 'paragraph', content: 'This is much better!' },
];

const NewPage = () => {
    const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
    const handleToggleToDo = (id: string) => {
        setBlocks(currentBlocks =>
            currentBlocks.map(block => {
                if (block.id === id && block.type === 'todo') {
                    return { ...block, checked: !(block as ToDoBlock).checked };
                }
                return block;
            })
        );
    };
    return (
        <>
            <header>
                <h1 className="font-bold text-3xl">Untitled</h1>
                <hr className="mt-4 border-b-1 rounded-lg border-muted-foreground"/>
            </header>
            <section>
                {blocks.map( (block) => {
                    if (block.type == 'heading'){
                        return <BlockHeading key={block.id} block={block} />
                    } else if (block.type == 'paragraph'){
                        return <BlockParagraph key={block.id} block={block} />;
                    } else if (block.type == 'todo') {
                        const todoBlock = block as ToDoBlock; 
                        return (
                            <BlockToDo
                                key={todoBlock.id}
                                block={block as ToDoBlock}
                                onToggle={() => handleToggleToDo(todoBlock.id)}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </section>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 py-1 px-4 my-4 border-muted-foreground border-2 rounded-lg transition-all hover:cursor-pointer hover:opacity-85">
                            <h6 className="text-sm font-medium">Add Blocks</h6>
                            <Plus className="size-4"/>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Blocks</DialogTitle>
                        <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                        <Label htmlFor="name-1">Name</Label>
                        <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-3">
                        <Label htmlFor="username-1">Username</Label>
                        <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
 }

const BlockToDo = ({block, onToggle}: BlockToDoComponentProps) => {
    return (
        <label className="flex items-center gap-2 my-1">
            <input type="checkbox" checked={block.checked} onClick={() => onToggle(block.id)} />
            <span>{block.content}</span>
        </label>
    )
}

const BlockHeading = ({block}: BlockComponentProps) => {
    return (
        <div className="flex items-center gap-2 my-2 p-2 rounded-lg hover:bg-accent">
            <div className="border-l-2 border-ring h-6" />
            <h1 className="font-medium text-xl">
                {block.content}
            </h1>
        </div>
    )
}

const BlockParagraph = ({block}: BlockComponentProps) => {
    return (
        <p className="px-2 py-1 rounded-lg hover:bg-accent">
            {block.content}
        </p>
    )
}

 export default NewPage; 