'use client'

import { useContext, useState } from 'react'
import { AccountContext } from '@/contexts/AccountContext'
import { Provider } from '@/db/schema'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { Check, ChevronsUpDown, Search, X } from 'lucide-react'

import { cn, formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { Slider } from '../ui/slider'

const STEP_MIN = 1
const STEP_MAX = 1000
const PRICE_MAX = 50000

const TemplateProducts = () => {
  const [page, setPage] = useState<number>(0)
  const [searchInput, setSearchInput] = useState<string>()
  const debouncedSearchInput = useDebounce(searchInput, 500)
  const [region, setRegion] = useState<string | null>()
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1000])
  const debouncedPriceRange = useDebounce(priceRange, 500)

  const { data: providerData, isLoading: providersLoading } = useQuery({
    queryKey: [
      'resources',
      page,
      debouncedSearchInput,
      region,
      debouncedPriceRange,
    ],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.append('page', String(page))
      if (debouncedSearchInput) {
        params.append('q', debouncedSearchInput)
      }
      if (region) {
        params.append('r', region)
      }
      params.append('min', String(debouncedPriceRange[0]))
      params.append('max', String(debouncedPriceRange[1]))
      const res = await fetch(`/api/providers?${params.toString()}`)
      return res.json() as Promise<{ data: Provider[] }>
    },
    placeholderData: keepPreviousData,
  })

  const { data: regionData, isLoading: regionLoading } = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const res = await fetch('/api/providers/regions')
      return res.json() as Promise<string[]>
    },
  })

  const { templateSelected, setTemplateSelected } = useContext(AccountContext)

  return (
    <section>
      <h1 className="text-4xl font-semibold text-black">Select a provider</h1>
      <Separator className="my-12" />
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-1 flex-wrap gap-4">
          <div className="relative flex w-full max-w-80 items-center">
            <Search className="absolute left-3 size-4" />
            <Input
              type="text"
              placeholder="Filter provider and item names"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild disabled={regionLoading}>
              <Button
                size="lg"
                variant="outline"
                role="combobox"
                className="min-w-64 justify-between"
              >
                <span className="max-w-[20ch] truncate">
                  {region ? region : 'Select region...'}
                </span>
                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 p-0">
              <Command>
                <CommandInput placeholder="Search regions..." />
                <CommandList>
                  <CommandEmpty>No regions found</CommandEmpty>
                  <CommandGroup>
                    {regionData?.map((regionItem) => {
                      const selected = regionItem === region
                      return (
                        <CommandItem
                          key={`region-${regionItem}`}
                          onSelect={() => {
                            selected ? setRegion(null) : setRegion(regionItem)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-1.5 size-4 shrink-0 transition-transform',
                              selected ? 'scale-100' : 'scale-0'
                            )}
                          />
                          {regionItem}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex w-full max-w-96 items-center gap-2">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 mt-px inline-flex items-center text-sm font-medium leading-10 text-muted-foreground">
                $
              </span>
              <Input
                type="text"
                value={priceRange[0]}
                onChange={(e) => {
                  let value = +e.target.value
                  if (isNaN(value)) return
                  setPriceRange([value, priceRange[1]])
                }}
                onBlur={(e) => {
                  const newValue = +e.target.value
                  if (newValue < STEP_MIN) {
                    setPriceRange([STEP_MIN, priceRange[1]])
                  }
                  if (newValue >= priceRange[1]) {
                    setPriceRange([
                      Math.max(priceRange[1] - 20, 0),
                      priceRange[1],
                    ])
                  }
                }}
                className="h-8 w-[5.125rem] pl-6"
              />
            </div>
            <Slider
              minStepsBetweenThumbs={2}
              max={STEP_MAX}
              min={STEP_MIN}
              step={10}
              onValueChange={(values) =>
                setPriceRange(values as [number, number])
              }
              className="w-full"
              value={priceRange}
            />
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 mt-px inline-flex items-center text-sm font-medium leading-10 text-muted-foreground">
                $
              </span>
              <Input
                type="text"
                value={priceRange[1]}
                onChange={(e) => {
                  let value = +e.target.value
                  if (isNaN(value)) return
                  setPriceRange([priceRange[0], +e.target.value])
                }}
                onBlur={(e) => {
                  if (+e.target.value > PRICE_MAX) {
                    setPriceRange([priceRange[0], PRICE_MAX])
                  }
                }}
                className="h-8 w-[5.125rem] pl-6"
              />
              <span
                className={cn(
                  'absolute bottom-full w-24 text-xs font-medium text-muted-foreground transition-opacity',
                  priceRange[1] === 1000 ? 'opacity-100' : 'opacity-0'
                )}
              >
                NO LIMIT
              </span>
            </div>
          </div>
        </div>
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setRegion(null)
            setSearchInput('')
          }}
          className="gap-1.5"
        >
          <X className="size-4 shrink-0" />
          Reset filter
        </Button>
      </div>
      <div className="mt-4">
        {providersLoading ? <p>Loading...</p> : null}
        {!providersLoading && providerData !== undefined ? (
          providerData.data.length === 0 ? (
            <p>No results found</p>
          ) : (
            <ul className="flex max-h-[calc(100svh-5rem)] flex-col gap-8 overflow-y-auto text-black">
              {providerData.data.map((provider) => {
                const selected = templateSelected?.id === String(provider.id)
                let config = ''
                if (provider.cpuGHZ) config += `${provider.cpuGHZ}GHz `
                if (provider.cpuCores) config += `${provider.cpuCores}-Core `
                if (provider.cpuThreads) config += `(${provider.cpuThreads})`
                if (provider.ram) config += `, ${provider.ram}GB RAM`
                if (provider.storageTotal)
                  config += `, ${provider.storageTotal} GB`
                if (provider.network) config += `, ${provider.network} Gbps`
                return (
                  <li
                    key={provider.id}
                    className="flex items-start gap-12 rounded-lg border border-darkGray/20 p-6 shadow-[0_0.75rem_0.75rem_hsl(0_0_0/0.05)]"
                  >
                    <div>
                      {/* <Image
                      src={`/images/template/${provider.providerName}.png`}
                      alt={provider.providerName}
                      width={50}
                      height={50}
                    /> */}
                      <p className="font-bold">{provider.providerName}</p>
                      <p>Bare Metal</p>
                    </div>
                    <div className="grow">
                      <h3 className="text-lg font-semibold">
                        {provider.productName}
                      </h3>
                      <p>{provider.location}</p>
                      <p className="mt-4">{config}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p>
                        Est.{' '}
                        {provider.priceSale !== null ? (
                          <span className="font-semibold">
                            {formatPrice(provider.priceSale)}{' '}
                          </span>
                        ) : null}
                        <span
                          className={cn(
                            provider.priceSale ? 'line-through' : ''
                          )}
                        >
                          {formatPrice(provider.priceMonth)}
                        </span>
                        /mo
                      </p>
                      <Button
                        variant={selected ? 'default' : 'outlinePrimary'}
                        size="lg"
                        className="min-w-56"
                        onClick={() => {
                          if (selected) {
                            setTemplateSelected(null)
                          } else {
                            setTemplateSelected({
                              id: String(provider.id),
                              providerName: provider.providerName,
                              productName: provider.productName,
                              location: provider.location,
                              cpuCores: String(provider.cpuCores),
                              ram: String(provider.ram),
                              priceMonth: String(provider.priceMonth),
                              priceHour: String(provider.priceHour),
                            })
                          }
                        }}
                      >
                        {selected ? 'Selected' : 'Select'}
                      </Button>
                      {provider.priceSale !== null ? (
                        <p className="font-semibold text-primary">
                          {formatPrice(
                            provider.priceMonth - provider.priceSale
                          )}{' '}
                          Cashback
                        </p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          )
        ) : null}
      </div>
    </section>
  )
}

export default TemplateProducts
