import React from 'react';
import { Footer,FooterCopyright } from 'flowbite-react';
import {BsFacebook,BsInstagram,BsGithub,BsDribbble,BsTwitter} from 'react-icons/bs'

export default function FooterWeb() {
  return (
    <Footer container className="border-t-2 border-gray-300">
        <div className="w-full flex flex-col gap-4">
          <div className="">
              <h2 className='text-xl font-bold font-serif text-violet-900'>Top Events</h2>
          </div>
          <div className="w-full sm:flex sm:justify-between sm:items-center">
              <FooterCopyright 
              href='#' 
              by='Top Events'
              year={new Date().getFullYear()}/>
              <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
               <Footer.Icon href='https://www.facebook.com/' icon={BsFacebook}/>
               <Footer.Icon href='https://www.instagram.com/' icon={BsInstagram}/>
               <Footer.Icon href='https://twitter.com/' icon={BsTwitter}/>
               <Footer.Icon href='https://github.com/HarshitDevsainia/EventPlanning' target='_blank' rel="noopener noreferrer" icon={BsGithub}/>
               <Footer.Icon href='https://dribbble.com/' icon={BsDribbble}/>
              </div>
          </div>
        </div>
    </Footer>
  );
}
