"use client";

import { MapPin, Calendar, GraduationCap, Briefcase, Code2, Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { experiences, education, certifications } from "@/data/resume";
import { OrgLogo, getInitials } from "@/components/org-logo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function calculateDuration(startDateStr: string, endDateStr?: string): string {
  const start = new Date(startDateStr + "-02");
  const end   = endDateStr ? new Date(endDateStr + "-02") : new Date();

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  if (months <= 0) months = 1;

  const years           = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const yearsPart  = years > 0           ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const monthsPart = remainingMonths > 0 ? `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}` : "";

  return [yearsPart, monthsPart].filter(Boolean).join(" ");
}

function TimelineNode({ isCurrent = false }: { isCurrent?: boolean }) {
  return (
    <span className="bg-background border-border group-hover:border-foreground/40 absolute top-2.5 -left-[35px] z-10 flex h-4.5 w-4.5 items-center justify-center rounded-full border transition-colors sm:-left-[43px]">
      {isCurrent ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      ) : (
        <span className="bg-muted-foreground/40 group-hover:bg-muted-foreground/60 h-1.5 w-1.5 rounded-full transition-colors" />
      )}
    </span>
  );
}

function MetaRow({
  icon: Icon,
  children,
  strong = false,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 ${strong ? "text-foreground/80 font-semibold" : "text-muted-foreground"}`}
    >
      <Icon className="text-muted-foreground/70 h-3.5 w-3.5 shrink-0" />
      <span className="text-xs">{children}</span>
    </div>
  );
}

export default function WorkClient() {
  const totalTechs = [...new Set(experiences.flatMap((e) => e.technologies))].length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8 pb-12"
    >
      <div>
        <motion.h1
          variants={itemVariants}
          className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Work Experience
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mt-2 max-w-2xl text-base leading-7"
        >
          Professional roles where I&apos;ve built and shipped production software.
        </motion.p>
      </div>

      {experiences.length > 0 && (
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              icon: Briefcase,
              label: "Roles",
              value: `${experiences.length} position${experiences.length !== 1 ? "s" : ""}`,
            },
            {
              icon: GraduationCap,
              label: "Education",
              value: `${education.length} institution${education.length !== 1 ? "s" : ""}`,
            },
            {
              icon: Award,
              label: "Certifications",
              value: `${certifications.length} verified`,
            },
            {
              icon: Code2,
              label: "Technologies",
              value: `${totalTechs} across all roles`,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="border-border/60 bg-muted/10 flex items-center gap-3 rounded-xl border px-4 py-3"
            >
              <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Icon className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground/60 mb-0.5 text-[10px] leading-none font-bold tracking-wider uppercase">
                  {label}
                </p>
                <p className="text-foreground truncate text-sm font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {experiences.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="border-border/60 bg-muted/5 flex flex-col items-center justify-center rounded-2xl border p-8 text-center"
        >
          <Briefcase className="text-muted-foreground/60 mb-3 h-8 w-8 animate-pulse" />
          <h3 className="text-base font-bold tracking-tight">Upskilling & Building</h3>
          <p className="text-muted-foreground mt-2 max-w-md text-xs leading-relaxed">
            I am currently focused on building innovative side projects, participating in hackathons,
            and expanding my expertise in AI and Full-Stack development. Professional roles will be
            featured here soon!
          </p>
        </motion.div>
      ) : (
        <div className="relative mt-2 ml-4 space-y-8 pl-6 sm:ml-6 sm:pl-8">
          <div
            className="from-border via-border absolute top-3 bottom-3 left-0 w-px bg-gradient-to-b to-transparent"
            aria-hidden="true"
          />
          {experiences.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.startDate}`}
              variants={itemVariants}
              className="group relative"
            >
              <TimelineNode isCurrent={exp.isCurrent} />

              <div className="bg-card group-hover:border-foreground/20 rounded-2xl border p-5 shadow-xs transition-all duration-300 sm:p-6">
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 items-start gap-3.5">
                    <OrgLogo
                      src={exp.logo}
                      alt={exp.company}
                      fallback={getInitials(exp.company)}
                      hoverEffect
                    />
                    <div className="flex min-w-0 flex-col">
                      <h3 className="flex flex-wrap items-center gap-2 text-lg font-bold tracking-tight">
                        {exp.role}
                        {exp.isCurrent && (
                          <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className="text-muted-foreground mt-0.5 text-sm font-medium">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="border-border/40 flex shrink-0 items-center justify-between gap-2 border-t pt-2 sm:flex-col sm:items-end sm:justify-start sm:border-t-0 sm:pt-0">
                    <MetaRow icon={Calendar} strong>
                      {exp.duration}
                      <span className="text-muted-foreground/50 ml-1 font-normal">
                        ({calculateDuration(exp.startDate, exp.endDate)})
                      </span>
                    </MetaRow>
                    <MetaRow icon={MapPin}>{exp.location}</MetaRow>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {exp.highlights.length > 0 && (
                  <ul className="mb-4 space-y-2">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-muted-foreground flex items-start gap-2.5 text-sm"
                      >
                        <span
                          className="bg-foreground/20 group-hover:bg-foreground/45 mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-muted/20 text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-default rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mt-4 flex flex-col gap-8">
          <div>
            <motion.h2
              variants={itemVariants}
              className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl"
            >
              Education
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mt-2 text-base leading-7"
            >
              Academic background and qualifications.
            </motion.p>
          </div>

          <div className="relative mt-2 ml-4 space-y-8 pl-6 sm:ml-6 sm:pl-8">
            <div
              className="from-border via-border absolute top-3 bottom-3 left-0 w-px bg-gradient-to-b to-transparent"
              aria-hidden="true"
            />
            {education.map((edu) => (
              <motion.div
                key={`${edu.school}-${edu.duration}`}
                variants={itemVariants}
                className="group relative"
              >
                <TimelineNode />

                <div className="bg-card group-hover:border-foreground/20 rounded-2xl border p-5 shadow-xs transition-all duration-300 sm:p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex min-w-0 items-start gap-3.5">
                      <OrgLogo
                        src={edu.logo}
                        alt={edu.school}
                        fallback={getInitials(edu.school)}
                      />
                      <div className="flex min-w-0 flex-col">
                        <h3 className="text-lg font-bold tracking-tight">{edu.school}</h3>
                        <p className="text-muted-foreground mt-0.5 text-sm font-medium">
                          {edu.degree}
                        </p>
                        {edu.description && (
                          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="border-border/40 flex shrink-0 items-center justify-between gap-2 border-t pt-2 sm:flex-col sm:items-end sm:justify-start sm:border-t-0 sm:pt-0">
                      <MetaRow icon={Calendar} strong>
                        {edu.duration}
                      </MetaRow>
                      {edu.location && <MetaRow icon={MapPin}>{edu.location}</MetaRow>}
                    </div>
                  </div>

                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {edu.highlights.map((item) => (
                        <li
                          key={item}
                          className="text-muted-foreground flex items-start gap-2.5 text-sm"
                        >
                          <span
                            className="bg-foreground/20 mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            aria-hidden="true"
                          />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mt-4 flex flex-col gap-8">
          <div>
            <motion.h2
              variants={itemVariants}
              className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl"
            >
              Licenses & Certifications
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mt-2 text-base leading-7"
            >
              Professional credentials and job simulations.
            </motion.p>
          </div>

          <div className="relative mt-2 ml-4 space-y-8 pl-6 sm:ml-6 sm:pl-8">
            <div
              className="from-border via-border absolute top-3 bottom-3 left-0 w-px bg-gradient-to-b to-transparent"
              aria-hidden="true"
            />
            {certifications.map((cert) => (
              <motion.div
                key={`${cert.name}-${cert.date}`}
                variants={itemVariants}
                className="group relative"
              >
                <TimelineNode />

                <div className="bg-card group-hover:border-foreground/20 rounded-2xl border p-5 shadow-xs transition-all duration-300 sm:p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex min-w-0 items-start gap-3.5">
                      <OrgLogo
                        src={cert.logo}
                        alt={cert.issuer}
                        fallback={getInitials(cert.issuer)}
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <h3 className="text-lg font-bold tracking-tight">{cert.name}</h3>
                        <p className="text-muted-foreground mt-0.5 text-sm font-medium">
                          {cert.issuer}
                        </p>
                        {cert.credentialId && (
                          <p className="text-muted-foreground/60 mt-1 text-xs font-mono">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="border-border/40 flex shrink-0 items-center justify-between gap-3 border-t pt-2 sm:flex-col sm:items-end sm:justify-start sm:border-t-0 sm:pt-0">
                      <MetaRow icon={Calendar} strong>
                        {cert.date}
                      </MetaRow>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground text-muted-foreground inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                        >
                          Verify <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
