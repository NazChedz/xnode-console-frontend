import React, { memo, useState } from 'react'
import { Handle, Position, useReactFlow, useStoreApi } from 'reactflow'

const options = [
  {
    value: 'smoothstep',
    label: 'Smoothstep',
  },
  {
    value: 'step',
    label: 'Step',
  },
  {
    value: 'default',
    label: 'Bezier (default)',
  },
  {
    value: 'straight',
    label: 'Straight',
  },
]

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow()
  const store = useStoreApi()

  const onChange = (evt) => {
    const { nodeInternals } = store.getState()
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          }
        }
        return node
      })
    )
  }

  return (
    <div className="custom-node__select">
      <div>Edge Type</div>
      <select
        className="nodrag rounded-[6px] bg-[#D9D9D9]"
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  )
}

function Options({ handleId, name, optionsSelection }) {
  const { setNodes } = useReactFlow()
  const store = useStoreApi()
  const [selected, setSelected] = useState<any>()

  return (
    <div className="">
      <select
        className="nodrag min-w-[85px] rounded-[6px] bg-[#D9D9D9] font-normal md:min-w-[104px] lg:min-w-[120px] xl:min-w-[138px] 2xl:min-w-[172px]"
        onChange={(option) => setSelected(option.target.value)}
        value={selected}
      >
        {optionsSelection.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function APINode({ id, data }) {
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(true)

  return (
    <>
      <div className="relative rounded-[7px] bg-[#EAEAEA] px-[10px] py-[7px] pb-[23px] pr-[17px] text-[8px] text-black md:px-[12px] md:py-[8.4px] md:pb-[15.6px] md:pr-[20.4px] md:text-[9.6px] lg:px-[14px] lg:py-[10px] lg:pb-[18px] lg:pr-[23px] lg:text-[11.2px] xl:px-[16px] xl:py-[11.2px] xl:pb-[21px] xl:pr-[27px] xl:text-[12.8px] 2xl:px-[20px] 2xl:py-[14px] 2xl:pb-[46px] 2xl:pr-[34px] 2xl:text-[16px]">
        <img
          src={`${
            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
              ? process.env.NEXT_PUBLIC_BASE_PATH
              : ''
          }/images/nodesFlow/api.svg`}
          alt="image"
          className={
            'w-[18 px] md:w-[21px] lg:w-[24.5px] xl:w-[28px] 2xl:w-[35px]'
          }
        />
        <div className="mt-[5px] font-medium md:mt-[6px] lg:mt-[7px] lg:!leading-[19px] xl:mt-[8px] 2xl:mt-[10px]">
          APIs
        </div>
        <div className="text-[7px] md:text-[8.4px] lg:mt-[7px] lg:text-[10px] xl:mt-[8px] xl:text-[11.2px] 2xl:mt-[10px] 2xl:text-[14px]">
          {data.name}
        </div>
        <div className="mt-[11px] grid gap-y-[18px] md:mt-[13px] md:gap-y-[19.2px] lg:mt-[15.4px] lg:gap-y-[22.5px] xl:mt-[17.5px] xl:gap-y-[25px] 2xl:mt-[22px] 2xl:gap-y-[32px]">
          <Options
            handleId={1}
            name={'Server'}
            optionsSelection={['Fast API config', 'Express config']}
          />
        </div>
        <Handle type="source" position={Position.Right} id={'1'} />
      </div>
    </>
  )
}

export default memo(APINode)
