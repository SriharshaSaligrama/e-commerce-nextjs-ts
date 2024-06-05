'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState, useFormStatus } from 'react-dom'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DiscountCodeType } from '@prisma/client'
import { addDiscountCode } from '../../_actions/discount-codes'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

const DiscountCodeForm = ({ products }: { products: { id: string, name: string }[] }) => {
    const [error, action] = useFormState(addDiscountCode, {})
    const [allProducts, setAllProducts] = useState(true)
    const today = new Date()
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset())

    return (
        <form action={action} className='space-y-8'>
            <div className='space-y-2'>
                <Label htmlFor="code">Code</Label>
                <Input id="code" name='code' required />
                {error?.code && <div className='text-destructive'>{error?.code}</div>}
            </div>
            <div className='space-y-2 flex gap-8 items-baseline'>
                <div className='space-y-2'>
                    <Label htmlFor="discountType">Discount Type</Label>
                    <RadioGroup id='discountType' name='discountType' defaultValue={DiscountCodeType.PERCENTAGE}>
                        <div className='flex gap-2 items-center'>
                            <RadioGroupItem value={DiscountCodeType.PERCENTAGE} id="percentage" />
                            <Label htmlFor='percentage'>Percentage</Label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <RadioGroupItem value={DiscountCodeType.FIXED} id="fixed" />
                            <Label htmlFor='fixed'>Fixed</Label>
                        </div>
                    </RadioGroup>
                    {error?.discountType && <div className='text-destructive'>{error?.discountType}</div>}
                </div>
                <div className='space-y-2 flex-grow'>
                    <Label htmlFor="discountAmount">Discount Amount</Label>
                    <Input id="discountAmount" name='discountAmount' type='number' required />
                    {error?.discountAmount && <div className='text-destructive'>{error?.discountAmount}</div>}
                </div>
            </div>
            <div className='space-y-2'>
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" name='limit' type='number' />
                <div className='text-muted-foreground'>
                    Leave blank for infinite uses
                </div>
                {error?.limit && <div className='text-destructive'>{error?.limit}</div>}
            </div>
            <div className='space-y-2'>
                <Label htmlFor="expiresAt">Expiration</Label>
                <Input id="expiresAt" name='expiresAt' type='datetime-local' className='w-max' min={today.toJSON().split(':').slice(0, -1).join(':')} />
                <div className='text-muted-foreground'>
                    Leave blank for no expiration
                </div>
                {error?.expiresAt && <div className='text-destructive'>{error?.expiresAt}</div>}
            </div>
            <div className='space-y-2'>
                <Label >Allowed Products</Label>
                {error?.allProducts && <div className='text-destructive'>{error?.allProducts}</div>}
                {error?.productIds && <div className='text-destructive'>{error?.productIds}</div>}
                <div className='flex gap-2 items-center'>
                    <Checkbox id="allProducts" name='allProducts' checked={allProducts} onCheckedChange={(e) => setAllProducts(e === true)} />
                    <Label htmlFor='allProducts'>All Products</Label>
                </div>
                {products.map((product) => (
                    <div key={product.id} className='flex gap-2 items-center'>
                        <Checkbox id={product.id} name='productIds' value={product.id} disabled={allProducts} />
                        <Label htmlFor={product.id}>{product.name}</Label>
                    </div>
                ))}
            </div>
            <SubmitButton />
        </form>
    )
}

export default DiscountCodeForm

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return <Button type='submit' disabled={pending}>{pending ? 'Saving...' : 'Save'}</Button>
}