import React from 'react'
import { Location } from '../types'
const ShowBranchesSection = ({ locations }: { locations: Location[] }) => {
    return (
        <div className="flex w-full flex-col items-start gap-4">
            <span className="text-2xl text-titleColor font-semibold">Our Branches</span>
            <div className="flex flex-row w-screen -mx-6 px-6 flex-nowrap gap-4 overflow-x-auto scrollbar-hide py-2 touch-auto">
                {locations.map((location: Location, index: number) => (
                    <div
                        key={index}
                        className="relative min-w-[220px] max-w-[240px] bg-white rounded-2xl border flex-shrink-0"
                    >
                        <div className="absolute top-2 left-2 bg-neutral-800 text-white text-xs font-medium px-3 py-1 rounded-lg z-10">
                        </div>
                        <img
                            src={location.image}
                            alt={location.name}
                            className="w-full h-[150px] object-cover rounded-t-2xl"
                        />
                        <div className="px-4 py-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 capitalize">{location.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mb-2 gap-2">
                                <span>{location.address}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowBranchesSection