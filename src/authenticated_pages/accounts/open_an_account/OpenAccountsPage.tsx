import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';

/**========================================================================
 * ?                                ABOUT
 * @author         :  name_on_card
 * @designation    :  Software Developer
 * @email          :  newtonmitro@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Israfil
 * @updatedOn      :  04 July 2023
 *========================================================================**/
function OpenAccountsPage() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={MyTransition.StaggerChildren.Fast}
    >
      <div className="bg-surface">
        <section className="flex flex-col-reverse items-start gap-6 text-justify md:flex-row">
          <div className="w-full">
            <div className="">
              <div className="bg-surface  px-4 text-primary shadow-sm">
                <div className="py-28 text-center">
                  <motion.h1
                    variants={MyVariants.SlideInFromRight}
                    transition={MyTransition.Spring.Low}
                    className="text-3xl font-extrabold uppercase"
                  >
                    Open An Account
                  </motion.h1>
                  <motion.p
                    variants={MyVariants.SlideInFromRight}
                    transition={MyTransition.Spring.Low}
                    className=""
                  >
                    Thank you for showing your interest in us, We are going to
                    implement account opening application feature very soon.
                    Please stay connected with us.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default OpenAccountsPage;
