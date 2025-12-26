"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useLanguage } from "@/hooks/use-language"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { RouteLiteral } from "nextjs-routes"
import { useEffect, useRef, useState } from "react"
import { INVESTMENT_REQUEST_TYPES } from "../../investment/_constants"
import { MARKETPLACE_REQUEST_TYPES } from "../../marketplace/_constants"
import { OUTREACH_HUB_TYPES } from "../../outreach-hub/_constants"
import { links as aboutLinksData } from "../footer/static"

interface ListItemChild {
    key: string
    title: TranslationKey
    description: TranslationKey | ""
    href: RouteLiteral
}

interface ListItem {
    title: TranslationKey
    href: RouteLiteral
    childs: ListItemChild[]
}

function ChildItem({ c }: { c: ListItemChild }) {
    const { isArabic } = useLanguage()
    const titleRef = useRef<HTMLAnchorElement>(null)
    const [titleWidth, setTitleWidth] = useState(0)

    useEffect(() => {
        if (titleRef.current) {
            setTitleWidth(titleRef.current.offsetWidth)
        }
    }, [])

    return (
        <li className="flex items-center gap-4 group relative">
            <Link
                ref={titleRef}
                href={c.href}
                className="text-sm text-background hover:underline"
            >
                <ClientTranslate translationKey={c.title} />
            </Link>
            <span
                className="
                    absolute top-0
                    opacity-0 translate-y-1
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-200 ease-out
                    bg-black text-background text-sm px-3
                "
                style={
                    isArabic ?
                        { right: titleWidth + 30 }
                    :   { left: titleWidth + 30 }
                }
            >
                {c.description !== "" && (
                    <ClientTranslate translationKey={c.description} />
                )}
            </span>
        </li>
    )
}

export default function NavList() {
    const marketplaceChilds: ListItemChild[] = MARKETPLACE_REQUEST_TYPES.map(
        (t) => ({
            key: t.key,
            title: t.title,
            description: t.description,
            href: getHref({
                pathname: "/[locale]/marketplace",
                query: { request_type: JSON.stringify([t.key]) },
            }),
        }),
    )
    const investmentChilds: ListItemChild[] = INVESTMENT_REQUEST_TYPES.map(
        (i) => ({
            key: i.key,
            title: i.name,
            description: i.description,
            href: getHref({
                pathname: "/[locale]/investment",
                query: { request_type: JSON.stringify([i.key]) },
            }),
        }),
    )
    const outreachhubChilds: ListItemChild[] = OUTREACH_HUB_TYPES.map((o) => ({
        key: o.key,
        title: o.name,
        description: o.description,
        href: getHref({
            pathname: "/[locale]/outreach-hub",
            query: { request_type: JSON.stringify([o.key]) },
        }),
    }))

    const aboutChilds: ListItemChild[] =
        aboutLinksData
            .find((section) => section.title === "aboutInexlynk")
            ?.links.map((link) => ({
                key: link.additionalPageType || link.name,
                title: link.name,
                description: "",
                href:
                    link.additionalPageType ?
                        (getHref({
                            pathname: `/[locale]/additional-pages/[slug]`,
                            query: { slug: link.additionalPageType },
                        }) as RouteLiteral)
                    :   link.href!,
            })) || []
    const list: ListItem[] = [
        {
            title: "marketplace",
            href: getHref({ pathname: "/[locale]/marketplace" }),
            childs: marketplaceChilds,
        },
        {
            title: "investmentMarket",
            href: getHref({ pathname: "/[locale]/investment" }),
            childs: investmentChilds,
        },
        {
            title: "outreachhub",
            href: getHref({ pathname: "/[locale]/outreach-hub" }),
            childs: outreachhubChilds,
        },
        {
            title: "aboutUs",
            href: getHref({ pathname: "/[locale]" }),
            childs: aboutChilds,
        },
    ]

    return (
        <div className="hidden lg:flex items-center gap-6 whitespace-nowrap">
            {list.map((item, i) => (
                <TooltipProvider
                    key={i}
                    delayDuration={0}
                    skipDelayDuration={0}
                >
                    <Tooltip>
                        <TooltipTrigger
                            asChild
                            className="text-background font-medium"
                        >
                            <Link href={item.href}>
                                <ClientTranslate translationKey={item.title} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent
                            sideOffset={10}
                            className="bg-black rounded-none w-screen text-background border-none py-8 mt-1.5"
                            side="bottom"
                            disableArrow
                        >
                            <div className="home-container !max-w-[90rem]">
                                <h3 className="font-bold text-2xl mb-4">
                                    <ClientTranslate
                                        translationKey={item.title}
                                    />
                                </h3>
                                <ul className="flex flex-col gap-1.5">
                                    {item.childs.map((c) => (
                                        <ChildItem key={c.key} c={c} />
                                    ))}
                                </ul>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
            <Link
                href={getHref({ pathname: "/[locale]/news" })}
                className="text-background"
            >
                <ClientTranslate translationKey="news" />
            </Link>
        </div>
    )
}
