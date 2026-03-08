const open = ref(false)
const onConfirmCallback = ref<(() => void) | null>(null)

export const useDeleteConfirm = () => {
  const openDialog = (callback: () => void) => {
    onConfirmCallback.value = callback
    open.value = true
  }

  const handleConfirm = () => {
    onConfirmCallback.value?.()
    open.value = false
    onConfirmCallback.value = null
  }

  const handleCancel = () => {
    open.value = false
    onConfirmCallback.value = null
  }

  return { open, openDialog, handleConfirm, handleCancel }
}
