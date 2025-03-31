import React from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Citizen files a complaint',
    description:
      'A citizen can easily file a complaint with the crime management system, providing essential details regarding the issue at hand. This complaint is securely stored for review by the Station Head.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'StationHead reviews and Assign an officer',
    description:
      'The Station Head reviews the filed complaint and assigns the case to an officer. The officer is then responsible for investigating the case and ensuring it is handled efficiently.',
    icon: LockClosedIcon,
  },
  {
    name: 'Officer reviews and work on the case',
    description:
      'The officer investigates the case, gathers necessary evidence, and works towards resolving the issue. This stage involves interacting with the concerned parties and processing the evidence collected.',
    icon: ArrowPathIcon,
  },
  {
    name: 'StationHead does a final review and close the case',
    description:
      'Once the officer completes the investigation, the Station Head performs a final review of the case. If everything is in order, the case is closed, ensuring that justice is served.',
    icon: FingerPrintIcon,
  },
];

const Learn = () => {
  return (
    <div id="learn" className="py-40 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h3 className="mt-5 text-base/2 font-semibold text-indigo-600">What happens to your complaint</h3>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            Everything you need to Know about our app
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Our app is designed to streamline the process of filing and handling complaints, ensuring a secure, swift, and transparent process at every step.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-20 gap-y-13 lg:max-w-none lg:grid-cols-2 lg:gap-y-14">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/6 font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Learn;