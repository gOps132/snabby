// src/jsx.d.ts

/** Snabbdom JSX support */

import { VNode } from 'snabbdom'

declare namespace JSX {
  type Element = VNode

  interface IntrinsicElements {
    [elemName: string]: any
  }
}

