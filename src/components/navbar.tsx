"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenu,
  NavigationMenuContent,
} from "@/src/components/ui/navigation-menu";

const cadastros = [
  {
    title: "Entidades",
    href: "/entities",
  },
  {
    title: "Fornecedores",
    href: "/suppliers",
  },
  {
    title: "Modulos",
    href: "/modules",
  },

  {
    title: "Tipos de Licitacão",
    href: "/bidding-types",
  },
];

export function Navbar() {
  return (
    <NavigationMenu className="flex-1 space-x-2 mx-6">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Cadastros</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="">
            {cadastros.map((item) => {
              return (
                <NavigationMenuItem key={item.title}>
                  <Link className="" href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="">
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contracts" className="w-full">
            Contratos
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
