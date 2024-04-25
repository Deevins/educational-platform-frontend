import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import '@radix-ui/colors/black-alpha.css'
import '@radix-ui/colors/mauve.css'
import '@radix-ui/colors/violet.css'
import { CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DropdownElem } from '@/components/Dropdown.tsx'

type Props = {
  submenus: DropdownElem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AvatarWithDropdown = ({ submenus }: Props) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
  const [urlsChecked, setUrlsChecked] = React.useState(false)

  console.log(submenus)
  // const [isActive, setIsActive] = useState<boolean>(false)
  // const ref = useRef<HTMLLIElement>()
  // const onMouseEnter = () => {
  //   setIsActive(true)
  // }
  //
  // const onMouseLeave = () => {
  //   setIsActive(false)
  // }
  //
  // const toggleDropdown = () => {
  //   setIsActive((prev) => !prev)
  // }

  // useEffect(() => {
  //   const handler = (event) => {
  //     if (isActive && ref.current && !ref.current.contains(event.target)) {
  //       setIsActive(false)
  //     }
  //   }
  //   document.addEventListener('mousedown', handler)
  //   document.addEventListener('touchstart', handler)
  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener('mousedown', handler)
  //     document.removeEventListener('touchstart', handler)
  //   }
  // }, [isActive])

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Avatar className={'hover:scale-105'}>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>

            <DropdownMenu.Trigger />
          </Avatar>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className='min-w-[150px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
            sideOffset={5}
          >
            <DropdownMenu.Item className='group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
              New Tab
              <div className='ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
                ⌘+T
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className='group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
              New Window
              <div className='ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
                ⌘+N
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className='group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'
              disabled
            >
              New Private Window
              <div className='ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
                ⇧+⌘+N
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className='group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1'>
                More Tools
                <div className='ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
                  <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className='min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item className='group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
                    Save Page As…{' '}
                    <div className='ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
                      ⌘+S
                    </div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className='text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
                    Create Shortcut…
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className='text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
                    Name Window…
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className='h-[1px] bg-violet6 m-[5px]' />
                  <DropdownMenu.Item className='text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
                    Developer Tools
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator className='h-[1px] bg-violet6 m-[5px]' />

            <DropdownMenu.CheckboxItem
              className='group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'
              checked={bookmarksChecked}
              onCheckedChange={setBookmarksChecked}
            >
              <DropdownMenu.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show Bookmarks{' '}
              <div className='ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
                ⌘+B
              </div>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              className='text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'
              checked={urlsChecked}
              onCheckedChange={setUrlsChecked}
            >
              <DropdownMenu.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show Full URLs
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}

export default AvatarWithDropdown
