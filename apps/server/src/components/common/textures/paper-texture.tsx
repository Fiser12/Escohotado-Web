export const PaperTexture: React.FC<{}> = () =>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-0">
    <defs>
          <filter id="roughpaper">
                <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.3"
                      numOctaves="4"
                      result="noise"
                />
                <feDiffuseLighting
                      in="noise"
                      lightingColor="#B0CFDB"
                      diffuseConstant="1"
                      surfaceScale="0.5"
                      result="light"
                >
                      <feDistantLight azimuth="10" elevation="50" />
                </feDiffuseLighting>
          </filter>
    </defs>
</svg>
