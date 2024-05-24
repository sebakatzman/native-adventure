"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useState } from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from "@nextui-org/button";
export const Navbar = () => {
  const [whatsapp, setWhatsapp] = useState(`https://wa.me/2901614736`);
  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-black" >
      <NavbarBrand as="li" className="min-w-40 min-h-16" >
        <NextLink href="/">
          <Image
            src={"/images/yaghan-adventure-b.svg"}
            width={120}
            height={120}
            alt={"dsa"}
          />
        </NextLink>
      </NavbarBrand>
      <NavbarContent>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label.toUpperCase()}
              </NextLink>
            </NavbarItem>
          ))}
          {whatsapp && (
            <Link href={whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon style={{ color: "green" }} />
            </Link>
          )}

          <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
            <InstagramIcon style={{ color: "#F45D7A" }} ></InstagramIcon>
          </Link>

          <a href="https://www.yaghanhostel.com" target="_blank" rel="noopener noreferrer">
            <Button size="sm" color="warning">
              YAGHAN HOSTEL
            </Button>
          </a>
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {whatsapp && (
          <Link href={whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon style={{ color: "green" }} />
          </Link>
        )}

        <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
          <InstagramIcon style={{ color: "#F45D7A" }} ></InstagramIcon>
        </Link>

        {/* <a href="https://www.yaghanhostel.com" target="_blank" rel="noopener noreferrer">
          <Button size="sm" color="warning">
            YAGHAN
          </Button>
        </a> */}

        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
