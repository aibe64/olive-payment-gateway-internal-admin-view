import { OliveButton, OliveField, OliveForm } from "@/components";
import SharedAuthLayout from "@/components/Layout/SharedAuthLayout";
import { useAuthorization } from "@/hooks";

const Home: React.FC = () => {
  const { handleLogin } = useAuthorization()

  const handleLinkClick = (url?: string) => {
    if (url) {
      // window.location.assign(`${AppConfig.MERCHANT_ONBOARDING_URL}${url}`)
    } else {
      // window.location.assign(AppConfig.MERCHANT_ONBOARDING_URL)
    }
  }
  
  return (
    <SharedAuthLayout>
      <div className='w-[99%] sm:w-[400px] md:w-[320px] lg:w-[400px] xl:w-[480px] flex'>
        <div className='w-full flex flex-col gap-y-5'>
          <section className='flex flex-col gap-y-4'>
            {/* caption */}
            <section className='flex flex-col items-center gap-1'>
              <span className='text-[24px] xl:text-[35px] font-extrabold uppercase'>Payment Gateway Admin</span>
              <span className='text-sm'>Please enter your details to continue.</span>
            </section>

            {/* form */}
            <section className='py-6 md:pb-0 2xl:pb-7'>
              <OliveForm
                onCallBack={handleLogin}
                className="w-full"
              >
                <div className="flex flex-col">
                  <OliveField
                    label={"Email Address"}
                    name="email"
                    labelClassNames="font-inter-semibold text-[#656565]"
                    validator="email"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <OliveField
                    label={"Password"}
                    name="password"
                    type="password"
                    labelClassNames="font-inter-semibold text-[#656565]"
                    required
                  />
                </div>

                <div className='pb-5 flex justify-end'>
                  {/* <Checkbox>
                    <span className="font-semibold">Remember Me</span>
                  </Checkbox> */}

                  <OliveButton.Link
                    title="Forgot Password?"
                    classNames="font-bold underline"
                    onClick={() => handleLinkClick('forgot-password')}
                  />
                </div>

                <div className="flex flex-col">
                  <OliveButton.Submit
                    title="Sign in"
                  />
                </div>
              </OliveForm>
            </section>
          </section>

          {/* link container */}
          <section className='text-center'>
            <div className='text-sm'>
              <span>Don&apos;t have an account? </span>

              <OliveButton.Link
                title="Sign up"
                classNames='font-extrabold'
                onClick={handleLinkClick}
              />
            </div>
          </section>
        </div>
      </div>
    </SharedAuthLayout>
  );
};

export default Home;
