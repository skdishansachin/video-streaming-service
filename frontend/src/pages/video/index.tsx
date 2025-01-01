import { PaperClipIcon } from "@heroicons/react/24/outline";
import VideoJS from "./videojs";
import { useRef } from "react";

const attachments = [
    { name: 'resume_front_end_developer.pdf', href: '#' },
    { name: 'coverletter_front_end_developer.pdf', href: '#' },
]

export default function VideoPage() {
    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: '//vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    return (
        <>
            <div>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
            <section aria-labelledby="applicant-information-title" className="mt-6">
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 id="applicant-information-title" className="text-lg/6 font-medium text-gray-900">
                            Applicant Information
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Application for</dt>
                                <dd className="mt-1 text-sm text-gray-900">Backend Developer</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900">ricardocooper@example.com</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">About</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                                    Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                                    proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                                </dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                        {attachments.map((attachment) => (
                                            <li
                                                key={attachment.name}
                                                className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                            >
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                                                    <span className="ml-2 w-0 flex-1 truncate">{attachment.name}</span>
                                                </div>
                                                <div className="ml-4 shrink-0">
                                                    <a href={attachment.href} className="font-medium text-blue-600 hover:text-blue-500">
                                                        Download
                                                    </a>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                        >
                            Read full application
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}