const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="bg-white px-[30px] py-[36px] text-black md:px-[70px] md:py-[43px] lg:px-[105px] lg:py-[50px] xl:px-[120px] xl:py-[58px] 2xl:px-[150px] 2xl:py-[73px]"
      >
        <div className="grid justify-center gap-x-[40px] md:flex md:gap-x-[68px] lg:gap-x-[79px] xl:gap-x-[90px] 2xl:gap-x-[140px]">
          <div className="pb-[25px]">
            <img
              src={`${
                process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                  ? process.env.NEXT_PUBLIC_BASE_PATH
                  : ''
              }/images/logo/xnode-logo.svg`}
              alt="image"
              className="h-[35px] w-[90px] md:h-[42px] md:w-[108px] lg:h-[49px] lg:w-[126px] xl:h-[56px] xl:w-[144px] 2xl:h-[70px] 2xl:w-[180px]"
            />
            <div className="mt-[11px] max-w-[610px] text-[14px] font-medium tracking-[-2%] md:mt-[13px] md:text-[16px] lg:mt-[15px] lg:text-[19px] lg:!leading-[34px] xl:text-[22px] 2xl:mt-[22px] 2xl:text-[28px]">
              Xnode allows single-click deployment of fully functional
              full-stack data infrastructure
            </div>
          </div>
          <div className="mt-auto gap-x-[15px] text-[9px] font-medium text-[#959595] md:flex md:gap-x-[18px] md:text-[10px] lg:gap-x-[21px] lg:text-[11px] lg:!leading-[150%] xl:gap-x-[24px] xl:text-[13px] 2xl:gap-x-[30px] 2xl:text-[16px]">
            <div className="max-w-[360px]">
              <span className="text-black">Scalable</span> <br /> Xnode adapts
              to the growing needs of a project, making it a reliable solution
              throughout a project&apos;s lifecycle
            </div>
            <div className="mt-[12px] max-w-[360px] md:mt-0">
              <span className="text-black">Automated setup process</span> <br />{' '}
              Server provisioning, Kubernetes configuration, networking setup,
              and essential services e.g. Apache Kafka and PostgreSQL
            </div>
          </div>
        </div>
      </section>
      <div className="w-full border-b text-[#D4D4D4]"></div>
    </>
  )
}

export default Hero
