import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const videos = [
    {
        id: 1,
        title: 'Elephants in the wild',
        thumbnail: '#',
        duration: '03:45',
        uploadedAt: 'January 1, 2025',
    },
    {
        id: 2,
        title: 'Beautiful African sunset',
        thumbnail: '#',
        duration: '05:20',
        uploadedAt: 'January 2, 2025',
    },
    {
        id: 3,
        title: 'Lions resting in the shade',
        thumbnail: '#',
        duration: '04:15',
        uploadedAt: 'January 3, 2025',
    },
    {
        id: 4,
        title: 'Cheetah on the hunt',
        thumbnail: '#',
        duration: '02:50',
        uploadedAt: 'January 4, 2025',
    },
    {
        id: 5,
        title: 'Giraffes at the watering hole',
        thumbnail: '#',
        duration: '06:10',
        uploadedAt: 'January 5, 2025',
    },
    {
        id: 6,
        title: 'Rhinos in the wild',
        thumbnail: '#',
        duration: '03:30',
        uploadedAt: 'January 6, 2025',
    },
    {
        id: 7,
        title: 'Zebras grazing on grass',
        thumbnail: '#',
        duration: '07:25',
        uploadedAt: 'January 7, 2025',
    },
]

const actions = [
    {
        name: 'Add to favorites',
        href: '#',
    },
    {
        name: 'Share',
        href: '#',
    },
    {
        name: 'Copy link',
        href: '#',
    },
    {
        name: 'Copy embed code',
        href: '#',
    }
]

export default function App() {
    return (
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {videos.map((video) => (
                <Link to="/videos/123" key={video.id}>
                    <div className="relative">
                        <img
                            src={video.thumbnail}
                            className="aspect-video w-full rounded-md bg-gray-200 shadow-sm object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700">
                                {video.title}
                            </h3>
                            <p className="mt-2 text-xs text-gray-700">{video.uploadedAt}</p>
                        </div>
                        <Menu as="div" className="relative flex-none">
                            <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                <span className="sr-only">Open options</span>
                                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                            </MenuButton>
                            <MenuItems
                                anchor="top end" // TODO: Change this prop to align
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                {actions.map((action) => (
                                    <MenuItem>
                                        <a
                                            href={action.href}
                                            className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                        >
                                            {action.name}
                                        </a>
                                    </MenuItem>
                                ))}
                            </MenuItems>
                        </Menu>
                    </div>
                </Link>
            ))}
        </div>
    )
}
