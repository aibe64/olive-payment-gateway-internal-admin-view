import appLogo from '@/assets/icons/logoicon.png'
// import footerImage from '@/assets/images/cbn_license_note.png'
import React from 'react'

export default function SharedAuthLayout({children}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen">
      <section className="w-full h-full px-4 lg:px-8">
        <div className="w-full h-full flex flex-col gap-y-[20px] justify-between">
          {/* header */}
          <section className='h-[80px] flex justify-center items-center'>
            <div className="w-[100px] md:w-fit">
              <img
                src={appLogo}
                alt="app logo"
                loading='lazy'
              />
            </div>
          </section>

          {/* form */}
          <section className="flex justify-center items-center">
            {children}
          </section>

          {/* footer */}
          {/* <section className='h-[50px] 2xl:h-[60px] flex justify-center items-center'>
            <div className="w-full xl:w-[50%] flex items-center justify-center">
              <img
                className='w-[220px] md:w-[150px] xl:w-[250px] 2xl:w-[330px]'
                src={footerImage}
                alt="licenced by cbn"
              />
            </div>
          </section> */}
        </div>
      </section>
    </div>
  )
}
