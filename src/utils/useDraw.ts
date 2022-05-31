import { ReactNode, useRef } from 'react';
// import { ref, Ref } from 'vue'
// interface PicType {
//   appRef: Ref<HTMLElement>
//   calcRate: () => void
//   windowDraw: () => void
// }
export default function useIndex(): any {
  const ref = useRef<ReactNode>(null);
  const timeoutRefId = useRef<number | null>();
  const appRef = ref;
  const scale = {
    width: '1920',
    height: '1080',
  };
  const baseWidth = 1920;
  const baseHeight = 1080;
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
  const calcRate = () => {
    // 当前宽高比
    const currentRate = parseFloat(
      (window.innerWidth / window.innerHeight).toFixed(5),
    );

    if (appRef.current) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = (
          (window.innerHeight * baseProportion) /
          baseWidth
        ).toFixed(5);
        scale.height = (window.innerHeight / baseHeight).toFixed(5);
        appRef.current.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
      } else {
        // 表示更高
        scale.height = (
          window.innerWidth /
          baseProportion /
          baseHeight
        ).toFixed(5);
        scale.width = (window.innerWidth / baseWidth).toFixed(5);
        appRef.current.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
      }
    }
  };

  const resize = () => {
    if (timeoutRefId.current) {
      clearTimeout(timeoutRefId.current);
    }

    const id = window.setTimeout(() => {
      calcRate();
    }, 200);

    if (timeoutRefId.current) {
      timeoutRefId.current = id;
    }
  };

  // 改变窗口大小重新绘制
  const windowDraw = () => {
    window.addEventListener('resize', resize);
  };

  return {
    appRef,
    calcRate,
    windowDraw,
  };
}
