import classNames from "classnames";
import { CirclePhoto } from "./circlePhoto";
import Image from "next/image"
import { ContentWrapper } from "../../common/content_wrapper/content_wrapper";
import { H2 } from "../../common/headers/H2";
import { useState } from "react";
import "./style.css";

interface Carouseltem {
      photoHref: string;
      title: string;
      description: string;
      year: number
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      items: Carouseltem[];
}

export const PhotoCarousel: React.FC<Props> = ({ items }) => {
      const [selected, setSelected] = useState<Carouseltem>(items.at(0)!)
      return (
            <ContentWrapper className="overflow-hidden">
                  <div className="w-full h-screen bg-white">
                        <div className="w-full pt-10 px-4 grid grid-cols-2">
                              <div className="w-full flex justify-center items-center">
                                    <div className="relative h-[400px] w-[350px]">
                                          <Image
                                                fill
                                                src={selected.photoHref}
                                                alt="Photo"
                                                className="object-cover"
                                          />
                                    </div>
                              </div>
                              <div className="flex flex-col gap-6 justify-center">
                                    <H2 label={selected.title} />
                                    <p>{selected.description}</p>
                              </div>
                        </div>
                        <div className="overflow-x-auto no-scrollbar">
                              <div className="relative inline-block m-10">
                                    <div className="flex gap-20">
                                          {items.map((item) => (
                                                <button onClick={() => { setSelected(item) }} className="z-10">
                                                      <CirclePhoto coverHref={item.photoHref} isSelected={item == selected} />
                                                </button>
                                          ))}
                                    </div>
                                    <div className="w-full border border-gray-200 absolute top-1/2 transform -translate-y-1/2"></div>
                              </div>
                        </div>
                  </div>
            </ContentWrapper>
      );
}