"use client"

import logoArabic from "@/assets/images/logo-arabic.png"
import logo from "@/assets/images/logo.png"
import { ClientOnly } from "@/components/common/client-only"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useLanguage } from "@/hooks/use-language"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"
import AuthButtons from "./auth-buttons"
import BurgerMenu from "./burger-menu"
import Chat from "./chat"
import CurrencySelect from "./currency-select"
import LanguageSelect from "./language-select"
import NavList from "./nav-list"
import Notification from "./notification"
import Profile from "./profile"
import SearchDropdown from "./search-dropdown"
import { useSearchStore } from "./search-dropdown/use-search-store"

export default function Navbar() {
    const { focus, searchDropDownContentHeight } = useSearchStore()
    const { isAuthenticated } = useProfileQuery()
    const { isArabic } = useLanguage()

    return (
        <nav id="navbar" className="sticky top-0 left-0 z-50 bg-black">
            <div
                className={cn(
                    "home-container !max-w-[90rem] clamp-[py,3,6] text-background flex items-center justify-between",
                    focus ? "gap-0 lg:gap-6" : "gap-6",
                )}
            >
                <div className="lg:hidden">
                    <BurgerMenu />
                </div>
                <Link
                    href={getHref({ pathname: "/[locale]" })}
                    className={cn(
                        "lg:!w-48 lg:!h-9 flex items-center w-[6.75rem] h-5",
                        focus && "hidden lg:block",
                    )}
                >
                    <Image
                        src={isArabic ? logoArabic : logo}
                        alt="logo"
                        priority
                    />
                </Link>
                <main
                    className={cn(
                        "flex items-center lg:gap-6 gap-3 transition-all",
                        focus && "flex-auto",
                    )}
                >
                    <div className={cn(focus ? "hidden" : "")}>
                        <NavList />
                    </div>
                    <div
                        className={cn(
                            focus ? "w-full" : (
                                "max-w-[1.875rem] sm:max-w-[25rem] w-full"
                            ),
                            "transition-all",
                        )}
                    >
                        <SearchDropdown />
                    </div>
                    <div className={cn(!focus ? "" : "lg:flex hidden")}>
                        <LanguageSelect />
                    </div>
                    <div className={cn("hidden lg:flex items-center gap-6")}>
                        <ClientOnly>
                            <CurrencySelect />
                        </ClientOnly>
                        {!isAuthenticated && <AuthButtons />}
                        {isAuthenticated && (
                            <>
                                <Notification />
                                <Chat />
                                <Profile />
                            </>
                        )}
                    </div>
                </main>
            </div>
            {focus && (
                <div
                    className="absolute top-20 bg-black w-full transition-all"
                    style={{
                        height: searchDropDownContentHeight + 60,
                    }}
                ></div>
            )}
        </nav>
    )
}
