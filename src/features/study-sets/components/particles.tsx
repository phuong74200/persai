import { useCallback } from "react";
import { default as ReactParticales } from "react-particles";
import { useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import type { Engine } from "tsparticles-engine";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim";

//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.

export function Particles() {
  const { width } = useViewportSize();
  const theme = useMantineTheme();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ReactParticales
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 60,
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: width,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "https://www.svgrepo.com/show/530663/protein.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 1,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 10,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              lineLinked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 100,
              duration: 2,
              opacity: 1,
              speed: 3,
            },
            repulse: {
              distance: 200,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        backgroundMask: {
          enable: true,
          cover: {
            value: theme.white,
          },
        },
        retina_detect: true,
        background: {
          image: `linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)`,
          position: "cover",
        },
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
      }}
    />
  );
}
