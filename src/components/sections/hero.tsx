"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  getYearsOfExperience,
  heroRoles,
  heroStack,
  siteConfig,
  socialLinks,
} from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const years = getYearsOfExperience();
  const childTransition = (duration: number) => ({
    duration: reduceMotion ? 0 : duration,
    ease,
  });

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % heroRoles.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const facts = [
    { value: `${years}+ yrs`, label: "Backend engineering" },
    { value: "Java 8 → 21", label: "Production Java" },
    { value: "3 domains", label: "Logistics · Fintech · Insurance" },
    { value: "Riyadh, KSA", label: "AST · UTC+3" },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-10 size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--glow),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-40 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,var(--cool-glow),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="noise pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-16">
          <motion.div
            className="min-w-0"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.08,
                  delayChildren: reduceMotion ? 0 : 0.05,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: childTransition(0.6) },
              }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-emerald-400 opacity-80" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                {siteConfig.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                <Icon name="mapPin" className="size-3" />
                {siteConfig.location}
              </span>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: childTransition(0.6) },
              }}
              className="mt-9 flex items-center gap-3"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border-strong lg:hidden">
                <Image
                  src={siteConfig.avatar}
                  alt={`Portrait of ${siteConfig.name}`}
                  fill
                  loading="eager"
                  sizes="48px"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Hi, I&apos;m{" "}
                  <span className="text-foreground">{siteConfig.name}</span>
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-2 lg:hidden">
                  Sr. Java Microservices Developer · Ajex Logistics
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: childTransition(0.8) },
              }}
              className="h1 mt-4 max-w-2xl"
            >
              Backend systems,
              <br />
              engineered to{" "}
              <span className="accent-serif text-accent">scale.</span>
            </motion.h1>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: childTransition(0.6) },
              }}
              className="mt-6 flex items-center gap-3 font-mono text-xs"
            >
              <span className="text-muted-2">Focus</span>
              <span className="h-px w-7 bg-border-strong" aria-hidden="true" />
              <span className="relative inline-flex h-5 min-w-[13.5rem] items-center overflow-hidden text-accent sm:min-w-[15rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={heroRoles[roleIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.32,
                      ease,
                    }}
                    className="whitespace-nowrap"
                  >
                    {heroRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: childTransition(0.6) },
              }}
              className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base"
            >
              <span className="text-foreground">
                Java Backend Engineer
              </span>{" "}
              building scalable systems and reliable distributed applications. I
              design services with Java, Spring Boot, Kafka and cloud-native
              infrastructure — and I care about what happens when they fail.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: childTransition(0.6) },
              }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <a href={siteConfig.resumePath} download>
                  <Icon name="download" className="size-4" />
                  Download Resume
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="#work">
                  View projects
                  <Icon name="arrowRight" className="size-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: childTransition(0.6) },
              }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-1.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel={
                      link.icon === "mail" ? undefined : "noopener noreferrer"
                    }
                    aria-label={`${link.label} — ${link.handle}`}
                    title={link.label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface/40 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                  >
                    <Icon name={link.icon} className="size-4" />
                  </a>
                ))}
              </div>
              <span className="hidden h-4 w-px bg-border-strong sm:block" aria-hidden="true" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-underline font-mono text-[11px] text-muted transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.18,
              ease,
            }}
            className="relative mx-auto hidden w-full max-w-[420px] lg:block lg:max-w-none"
          >
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%)] blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="relative rounded-[2rem] border border-border-strong bg-surface/80 p-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)] backdrop-blur">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-surface-2">
                  <Image
                    src={siteConfig.avatar}
                    alt={`Portrait of ${siteConfig.name}, Java Backend Engineer`}
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover object-[center_22%]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 ring-1 ring-inset ring-white/10"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3.5 text-white backdrop-blur-md">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                        Currently
                      </p>
                      <p className="mt-1.5 text-sm font-medium">
                        Sr. Java Microservices Developer
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/70">
                        Ajex Logistics · Riyadh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="animate-float absolute -left-4 top-8 hidden items-center gap-2 rounded-full border border-border-strong bg-surface/90 px-3 py-2 shadow-xl backdrop-blur sm:flex"
                style={{ animationDelay: "-2s" }}
              >
                <Icon name="coffee" className="size-3.5 text-accent" />
                <span className="font-mono text-[10px] tracking-[0.08em] text-foreground">
                  Java 21
                </span>
              </div>

              <div
                className="animate-float absolute -right-4 top-1/3 hidden items-center gap-2 rounded-full border border-border-strong bg-surface/90 px-3 py-2 shadow-xl backdrop-blur sm:flex"
                style={{ animationDelay: "-5s" }}
              >
                <Icon name="leaf" className="size-3.5 text-emerald-500" />
                <span className="font-mono text-[10px] tracking-[0.08em] text-foreground">
                  Spring Boot
                </span>
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-muted-2">
              Riyadh · 24.7136° N, 46.6753° E
            </p>
          </motion.div>
        </div>

        <div className="mt-14 border-y border-border py-5 sm:mt-20">
          <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={cn(
                  "px-1 sm:px-6",
                  index === 0 && "sm:pl-0",
                  index === facts.length - 1 && "sm:pr-0",
                )}
              >
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-lg tracking-tight text-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

              <div className="marquee relative mt-10 overflow-hidden border-y border-border py-3.5" aria-hidden="true">
        <div className="marquee-track flex w-max items-center gap-8">
          {[...heroStack, ...heroStack, ...heroStack, ...heroStack].map(
            (item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2"
              >
                {item}
                <span className="size-1 rounded-full bg-border-strong" aria-hidden="true" />
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
