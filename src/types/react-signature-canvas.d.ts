declare module 'react-signature-canvas' {
  import * as React from 'react'

  export interface SignatureCanvasProps {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>
    clearOnResize?: boolean
    velocityFilterWeight?: number
    minWidth?: number
    maxWidth?: number
    minDistance?: number
    dotSize?: number | (() => number)
    penColor?: string
    throttle?: number
    onEnd?: () => void
    onBegin?: () => void
  }

  export default class SignatureCanvas extends React.Component<SignatureCanvasProps> {
    clear: () => void
    isEmpty: () => boolean
    toDataURL: (type?: string, encoderOptions?: number) => string
    fromDataURL: (dataURL: string, options?: object) => void
    toData: () => Array<Array<{ x: number; y: number; time: number }>>
    fromData: (pointGroups: Array<Array<{ x: number; y: number; time: number }>>) => void
  }
} 