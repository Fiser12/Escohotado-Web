"use client";

import { CirclePhoto } from "./circlePhoto";
import Image from "next/image"
import { useState } from "react";
import "./style.css";
import { Typo } from "@/components/common/typographies/Typographies";

export interface Carouseltem {
      photoHref: string;
      title: string;
      description: React.ReactNode;
      year?: number | null
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      items: Carouseltem[];
}

export const PhotoCarousel: React.FC<Props> = ({ items }) => {
      const [selected, setSelected] = useState<Carouseltem>(items.at(0)!)
      return (
            <div className="w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                        <div className="w-full flex justify-center items-center">
                              <div className="relative h-[400px] w-full mr-6 md:m-0">
                                    <Image
                                          fill
                                          src={selected.photoHref}
                                          alt="Photo"
                                          className="object-cover"
                                    />
                              </div>
                        </div>
                        <div className="flex flex-col gap-4 px-10 lg:px-16">
                              <div className="h-full flex flex-col gap-4 md:gap-6 justify-center">
                                    <Typo.H2 className='w-full'>{selected.title}</Typo.H2>
                                    {selected.description}
                              </div>
                              <p className="font-display text-7xl md:text-8xl bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-transparent translate-y-3">{selected.year}</p>
                        </div>
                  </div>
                  {items.length > 1 && <div className="overflow-x-auto no-scrollbar">
                        <div className="relative inline-block mx-10 my-8 md:my-10">
                              <div className="flex gap-16 md:gap-20">
                                    {items.map((item, i) => (
                                          <button key={i} onClick={() => { setSelected(item) }} className="z-10">
                                                <CirclePhoto coverHref={item.photoHref} isSelected={item == selected} />
                                          </button>
                                    ))}
                              </div>
                              <div className="w-full border border-gray-200 absolute top-1/2 transform -translate-y-1/2"></div>
                        </div>
                  </div>}
            </div>
      );
}