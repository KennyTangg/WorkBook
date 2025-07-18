"use client"

import { useState } from "react"
import { Folder, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import { deletePage } from "@/actions/delete-page"
import { toast } from "sonner"
import { supabase } from "@/utils/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Link from "next/link"

export function NavProjects({ userId ,projects }: { 
  userId: string,
  projects: {
    id: string
    name: string
    url: string
  }[]
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [renameProjectId, setRenameProjectId] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")

  async function handleRename() {
    if (!renameProjectId) return

    const { error } = await supabase
      .from("pages")
      .update({ title: newTitle })
      .eq("id", renameProjectId)

    if (error) {
      console.error("Failed to rename page:", error)
      toast.error("Failed to rename page")
      return
    }

    toast.success("Page renamed!")
    router.refresh()
    setIsRenameOpen(false)
    setRenameProjectId(null)
  }

  async function handleDelete(pageId: string, pageUrl: string) {
    try {
      await deletePage(pageId, userId);
      toast("Page deleted!", {
        style: {
          background: "#f43f5e",
          border: "1px solid #f43f5e",
          color: "#fff",
          fontWeight: "800",
        },
        icon: <Trash2 className="size-4" />,
      });
      if (pathname === pageUrl) {
        router.push("/dashboard/home");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete page");
    }
  }

  return (
    <>
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Pages</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((project) => (
          <SidebarMenuItem key={project.id}>
            <SidebarMenuButton asChild>
              <Link href={project.url} prefetch passHref>
                <span>{project.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg "
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem onClick={() =>router.push(project.url)} className="transition-all hover:bg-muted-foreground/10 hover:cursor-pointer">
                  <Folder className="text-muted-foreground " />
                  <span>View Page</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                      setNewTitle(project.name)
                      setRenameProjectId(project.id)
                      setIsRenameOpen(true)
                    }}
                  >
                    <SquarePen className="text-muted-foreground" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete(project.id, project.url)} className="transition-all hover:bg-red-400/20 hover:cursor-pointer">
                  <Trash2 className="text-red-400"/>
                  <span className="text-red-400">Delete page</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
    <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Page</DialogTitle>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
