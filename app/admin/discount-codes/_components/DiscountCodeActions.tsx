'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteDiscountCode, toggleDiscountCodeActive } from '../../_actions/discount-codes'

export const ActiveToggleDropdownItem = ({ id, isActive }: { id: string, isActive: boolean }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleDiscountCodeActive(id, !isActive)
                    router.refresh()
                })
            }}>
            {isActive ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
    )
}

export const DeleteDropdownItem = ({ id, disabled }: { id: string, disabled: boolean }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            variant='destructive'
            disabled={disabled || isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteDiscountCode(id)
                    router.refresh()
                })
            }}>
            Delete
        </DropdownMenuItem>
    )
}

