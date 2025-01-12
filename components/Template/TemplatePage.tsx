'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { AccountContext } from '@/contexts/AccountContext'

import {
  DeploymentConfiguration,
  ServiceData,
  ServiceFromName,
  Specs,
  TemplateFromId,
  TemplateGetSpecs,
} from '@/types/dataProvider'

const Template = (id: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // const [data, setTemplateData] = useState<TemplateData>()
  const [data, setDeployConfig] = useState<DeploymentConfiguration>()
  const [templateSpecs, setTemplateSpecs] = useState<Specs>()
  const { draft } = useContext(AccountContext)

  const getData = useCallback(
    (id: any) => {
      setIsLoading(true)

      // XXX: Not sure if this is the best place to put this but whatever.
      if (id.id == 'edit') {
        // Problem with this is the draft contains extra info like the location or whatever.
        if (draft) {
          setDeployConfig(draft)
        } else {
          setDeployConfig(
            JSON.parse(localStorage.getItem('draft')) as DeploymentConfiguration
          )
        }
      } else {
        // Generate the config from the template id.
        console.log('o id q vai chamar')
        console.log(id)

        console.log('Aca viene la data!')
        let template = TemplateFromId(id.id)

        console.log(template)

        if (template) {
          let svs: ServiceData[] = []

          for (let i = 0; i < template.serviceNames.length; i++) {
            let s = ServiceFromName(template.serviceNames[i])
            if (s) {
              svs.push(s)
            }
          }

          const d: DeploymentConfiguration = {
            name: template.name,
            desc: template.desc,
            location: '',
            services: svs,
            // XXX: Actually check from AccountContext.
            isUnit: false,
            provider: '',
          }

          setDeployConfig(d)
          setTemplateSpecs(TemplateGetSpecs(template))
        } else {
          // XXX:
          // NUCLEAR APOCALIPSE TIER!
          // Should just redirect probably.
        }
      }

      setIsLoading(false)
    },
    [draft]
  )

  useEffect(() => {
    setIsLoading(true)
    // When anything is clicked?
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    if (id) {
      getData(id.id)
    }
  }, [id, getData])

  if (isLoading) {
    return (
      <div className="">
        <div className="h-[100px] w-[800px] animate-pulse bg-[#e5e5e5]"></div>
        <div className="h-[100px] w-[200px] animate-pulse bg-[#e5e5e5]"></div>
      </div>
    )
  }

  return (
    <section className="relative z-10">
      <div className="flex justify-between gap-x-[10px]">
        <div className="flex items-center gap-x-[9px]">
          <img
            src={`${
              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                ? process.env.NEXT_PUBLIC_BASE_PATH
                : ''
            }/images/template/line.svg`}
            alt="image"
            className={`w-[48px]`}
          />
          <input
            value={data?.name}
            placeholder=""
            onChange={(e) => {
              if (e.target.value.length < 1000) {
                const newData = { ...data }
                newData.name = e.target.value
                setDeployConfig(newData)
              }
            }}
            className="w-full bg-white text-[44px] font-semibold leading-[64px] placeholder:text-[#6B7280] 2xl:text-[48px]"
          />
        </div>
      </div>

      <div className="">
        <div className="flex gap-x-[4px] text-[11px] text-[#0354EC] 2xl:text-[12px]">
          {TemplateFromId(id)?.tags?.map((item, index) => (
            <div key={index} className="underline underline-offset-2">
              {item},
            </div>
          ))}
        </div>
        <textarea
          value={data?.desc}
          placeholder=""
          onChange={(e) => {
            if (e.target.value.length < 1000) {
              const newData = { ...data }
              newData.desc = e.target.value
              setDeployConfig(newData)
            }
          }}
          className="mt-[23px] h-[100px] max-h-[100px] w-full max-w-[735px] bg-white text-[14px] leading-[22px] placeholder:text-[#6B7280] 2xl:text-[16px]"
        />

        <div className="mt-[40px] text-[10px] md:text-[12px] lg:mt-[59px] 2xl:text-[14px]">
          <div className="text-[16px] font-semibold 2xl:text-[18px]">
            System requirements
          </div>
          <div className="mt-[15px] flex gap-x-[30px] border-[0.7px] border-[#CDCDCD] px-[20px] py-[8px] font-medium lg:gap-x-0">
            <div className="md:w-2/5 lg:w-1/2">Min requirements</div>
            <div className="lg:w-1/2">Recommended requirements</div>
          </div>
          <div className="mt-[15px] flex gap-x-[10px] px-[20px] font-normal lg:gap-x-0">
            <div className="lg:w-1/2">{templateSpecs?.ram}</div>
            <div>{templateSpecs?.ram}</div>
          </div>
          <div className="mt-[30px] border-b border-[#DDDDDD]"></div>
        </div>
        <div className="mt-[40px] text-[10px] md:text-[12px] lg:mt-[59px] 2xl:text-[14px]">
          <div className="text-[16px] font-semibold 2xl:text-[18px]">
            Services{' '}
          </div>
          <div className="mt-[15px] flex border-[0.7px] border-[#CDCDCD] px-[5px] py-[8px] font-medium lg:px-[20px]">
            <div className="w-[15%]">Name</div>
            <div className="w-1/5">Description</div>
            <div className="w-[15%]">Specs</div>
            <div className="w-1/4">Tags</div>
          </div>
          {data?.services && (
            <div>
              {data.services?.map((item, index) => (
                <div key={index}>
                  <div className="mt-[8px] border-b border-[#DDDDDD]"></div>
                  <div className="mt-[8px] flex px-[20px] font-normal">
                    <div className="w-[15%] max-w-[30%] overflow-hidden">
                      {item?.name}
                    </div>
                    <div className="w-1/5">{item.desc}</div>

                    <div className="w-[15%]">{'CPU, 1-Core'}</div>

                    <div className="w-1/4">{item?.tags.join(', ')}</div>

                    <button
                      data-modal-target="idname"
                      type="button"
                      data-modal-toggle="idname"
                    >
                      Edit
                    </button>

                    {
                      // TODO: Save a record of the state here? Since it's where the services' configuration will be changed.
                      // Could maybe have each service find inself on the list of modified services and modify that?
                      // Might need a way to tell the user what's up with their config?
                    }

                    {/* <Modal> */}

                    {/* </Modal> */}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-[8px] border-b border-[#DDDDDD]"></div>
        </div>
      </div>
    </section>
  )
}

export default Template
