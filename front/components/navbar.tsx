"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import Image from "next/image";
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from "@nextui-org/button";
export const Navbar = () => {
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
      <NavbarContent style={{ display: "flex", justifyContent: "flex-end" }}>
        <ul className="hidden lg:flex gap-4 justify-start ml-2" style={{ display: "flex", alignItems: "center" }}>
          <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="hidden lg:flex">
            <InstagramIcon style={{ color: "#F45D7A", width: "40px", height: "40px" }} ></InstagramIcon>
          </Link>

          <a href="https://www.yaghanhostel.com" target="_blank" rel="noopener noreferrer" className="hidden lg:flex">
            <Button size="sm" color="warning">
              YAGHAN HOSTEL
            </Button>
          </a>
        </ul>
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
