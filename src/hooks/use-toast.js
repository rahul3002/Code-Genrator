"use client"

import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export function useToast() {
  const [state, setState] = React.useState([])

  React.useEffect(() => {
    state.forEach((toast) => {
      if (toast.open) {
        addToRemoveQueue(toast.id)
      }
    })
  }, [state])

  function toast({ ...props }) {
    const id = genId()

    setState((state) => [
      ...state,
      {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            setState((state) =>
              state.map((t) =>
                t.id === id
                  ? {
                      ...t,
                      open: false,
                    }
                  : t
              )
            )
          }
        },
      },
    ])

    return {
      id,
      dismiss: () => setState((state) => state.filter((t) => t.id !== id)),
    }
  }

  return {
    toast,
    toasts: state,
  }
} 