import { useState } from "react";

export function Hamburguer() {
      const [isActive, setIsActive] = useState(false);

      const dotBase = "absolute w-1 h-1 bg-primary-900 transition-all duration-300";

      return (
            <div
                  className="relative w-12 h-12 cursor-pointer rounded"
                  onClick={() => setIsActive(!isActive)}
            >
                  {/* DOT 1 */}
                  <span
                        className={`
                              ${dotBase}
                              top-2 left-2 
                              ${isActive ? "opacity-0" : "opacity-100"}
                        `}
                  />
                  {/* DOT 2 */}
                  <span
                        className={`
                              ${dotBase}
                              top-2 left-1/2 transform -translate-x-1/2
                              ${isActive ? "opacity-0" : "opacity-100"}
                        `}
                  />
                  {/* DOT 3 */}
                  <span
                        className={`
                              ${dotBase}
                              top-2 right-2
                              ${isActive ? "opacity-0" : "opacity-100"}
                        `}
                  />
                  {/* DOT 4 */}
                  <span
                        className={`
                              ${dotBase}
                              top-1/2 left-2 transform -translate-y-1/2
                              ${isActive ? "opacity-0" : "opacity-100"}
                        `}
                  />
                  {/* DOT 5 (CENTRO) - Este lo rotamos en modo X */}
                  <span
                        className={`
                              ${dotBase}
                              top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              ${isActive ? "h-6 rotate-45 origin-center w-[2px]" : "h-1"}
                        `}
                  />
                  {/* DOT 6 */}
                  <span
                        className={`
                              ${dotBase}
                              top-1/2 right-2 transform -translate-y-1/2
                              ${isActive ? "opacity-0" : "opacity-100"}
                        `}
                  />
                  {/* DOT 7 */}
                  <span
                        className={`
                              ${dotBase}
                              bottom-2 left-2
                              ${isActive ? "opacity-0" : "opacity-100"}
                        `}
                  />
                  {/* DOT 8 */}
                  <span
                        className={`
                              ${dotBase}
                              bottom-2 left-1/2 transform -translate-x-1/2
                              ${isActive ? "opacity-0" : "opacity-100"}
                        `}
                  />
                  {/* DOT 9 (CENTRO) - Segunda línea de la X */}
                  <span
                        className={`
                              ${dotBase}
                              top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              ${isActive ? "h-6 -rotate-45 origin-center  w-[2px]" : "h-1"}
                        `}
                  />
                  {/* DOT 10 */}
                  <span
                        className={`
                              ${dotBase}
                              bottom-2 right-2
                              ${isActive ? "opacity-0" : "opacity-100"}
                        `}
                  />
            </div>
      );
}
