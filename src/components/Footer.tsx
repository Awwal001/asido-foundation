import { SITE_CONFIG, FOOTER_LINKS, SOCIAL_LINKS, CONTACT_ICONS } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

type FooterLink = {
  readonly label: string
  readonly href: string
}

const SocialIcon = ({ social }: { social: typeof SOCIAL_LINKS[number] }) => (
  <a 
    href={social.href} 
    className="hover:opacity-80 transition-opacity w-9 h-9 flex items-center justify-center"
    aria-label={social.alt}
  >
    <Image src={social.icon} alt={social.alt} width={16} height={16} />
  </a>
)

const ContactItem = ({ 
  icon, 
  alt, 
  children 
}: { 
  icon: string
  alt: string
  children: React.ReactNode 
}) => (
  <div className="flex items-start space-x-3">
    <Image src={icon} alt={alt} width={16} height={16} className="mt-0.5 flex-shrink-0" />
    {children}
  </div>
)

const FooterSection = ({ 
  title, 
  children 
}: { 
  title: string
  children: React.ReactNode 
}) => (
  <div>
    <h3 className="font-bold text-[20px] leading-[100%] mb-4 text-[#EBEDF1]">
      {title}
    </h3>
    {children}
  </div>
)

const FooterLinkList = ({ links }: { links: readonly FooterLink[] }) => (
  <ul className="space-y-2">
    {links.map((link) => (
      <li key={link.label}>
        <a 
          href={link.href} 
          className="hover:text-white transition-colors text-[16px]"
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
)

export default function Footer() {
  return (
    <footer className="bg-primary text-[#EBEDF1]">
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-8">
            <div className="lg:col-span-1 flex flex-col space-y-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-white.svg"
                  alt="Asido Foundation"
                  width={150}
                  height={50}
                />
              </Link>
              <p className="leading-relaxed text-[16px]">
                {SITE_CONFIG.description}
              </p>
              <div className="flex space-x-3 mt-16">
                {SOCIAL_LINKS.map((social) => (
                  <SocialIcon key={social.name} social={social} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <FooterSection title="Quick Links">
                <FooterLinkList links={FOOTER_LINKS.quickLinks} />
              </FooterSection>
            </div>

            <div className="lg:col-span-1">
              <FooterSection title="Support">
                <FooterLinkList links={FOOTER_LINKS.support} />
              </FooterSection>
            </div>

            <div className="lg:col-span-1">
              <FooterSection title="Contact Us">
                <address className="not-italic space-y-3 text-[16px]">
                  <ContactItem icon={CONTACT_ICONS.location} alt="Address">
                    <span>{FOOTER_LINKS.contact.address}</span>
                  </ContactItem>
                  
                  <ContactItem icon={CONTACT_ICONS.envelope} alt="Email">
                    <a 
                      href={`mailto:${FOOTER_LINKS.contact.email}`} 
                      className="hover:text-white transition-colors"
                    >
                      {FOOTER_LINKS.contact.email}
                    </a>
                  </ContactItem>
                  
                  {FOOTER_LINKS.contact.phones.map((phone, index) => (
                    <div key={phone} className="flex items-start space-x-3">
                      {index === 0 && (
                        <Image 
                          src={CONTACT_ICONS.call} 
                          alt="Phone" 
                          width={16} 
                          height={16} 
                          className="mt-0.5 flex-shrink-0" 
                        />
                      )}
                      {index !== 0 && <div className="w-4 flex-shrink-0"></div>}
                      <a 
                        href={`tel:${phone.replace(/\s/g, '')}`} 
                        className="hover:text-white transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  ))}
                </address>
              </FooterSection>
            </div>
          </div>

          <div className="border-t border-[#EBEDF1]/20 mt-8 pt-8">
            <p className="text-[#EBEDF1] text-[16px]">
              © 2025 {SITE_CONFIG.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4 mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-white.svg"
                alt="Asido Foundation"
                width={125}
                height={40}
              />
            </Link>
            <p className="leading-relaxed text-sm text-[#EBEDF1]">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 px-4">
            <FooterSection title="Quick Links">
              <FooterLinkList links={FOOTER_LINKS.quickLinks} />
            </FooterSection>

            <FooterSection title="Support">
              <FooterLinkList links={FOOTER_LINKS.support} />
            </FooterSection>
          </div>

          <div className="border-t border-[#EBEDF1]/20 my-6"></div>

          <div className="text-center mb-6">
            <FooterSection title="Contact Us">
              <address className="not-italic space-y-3 text-[14px] text-[#EBEDF1]">
                <div className="flex px-4 space-x-2">
                  <Image src={CONTACT_ICONS.location} alt="Address" width={14} height={14} />
                  <span>{FOOTER_LINKS.contact.address}</span>
                </div>
                <div className="flex px-4 space-x-2">
                  <Image src={CONTACT_ICONS.envelope} alt="Email" width={14} height={14} />
                  <a 
                    href={`mailto:${FOOTER_LINKS.contact.email}`} 
                    className="hover:text-white transition-colors"
                  >
                    {FOOTER_LINKS.contact.email}
                  </a>
                </div>
                <div className="flex flex-col px-4 space-y-2">
                  {FOOTER_LINKS.contact.phones.map((phone, index) => (
                    <div key={phone} className="flex items-center space-x-2">
                      {index === 0 && (
                        <Image src={CONTACT_ICONS.call} alt="Phone" width={14} height={14} />
                      )}
                      {index !== 0 && <div className="w-3.5"></div>}
                      <a 
                        href={`tel:${phone.replace(/\s/g, '')}`} 
                        className="hover:text-white transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>
              </address>
            </FooterSection>
          </div>

          <div className="border-t border-[#EBEDF1]/20 my-6"></div>

          <div className="text-center mb-6">
            <p className="text-[#EBEDF1] text-sm">
              © 2025 {SITE_CONFIG.name}. All Rights Reserved.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            {SOCIAL_LINKS.map((social) => (
              <SocialIcon key={social.name} social={social} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}