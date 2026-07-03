import { pool } from "@/lib/db";
import Link from "next/link";
import { FadeIn, Typewriter, ScrollIndicator } from "@/components/HomeAnimations";
import ProjectCard from "@/components/projectCard";
import AutoSlider from "@/components/AutoSlider";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    let skills: any[] = [];
    let projects: any[] = [];
    let lifeMoments: any[] = [];
    try {
        const [skillsRows] = await pool.execute("SELECT * FROM portfolio_skills ORDER BY category ASC");
        skills = skillsRows as any[];

        const [projectsRows] = await pool.execute("SELECT * FROM portfolio_projects ORDER BY created_at DESC LIMIT 5");
        projects = projectsRows as any[];
        const [galleryRows] = await pool.execute("SELECT * FROM portfolio_life ORDER BY created_at DESC") as any[];
        lifeMoments = galleryRows as any[];
    } catch (e) {
        console.error("Failed to fetch data from DB. Falling back to hardcoded data.", e);
        
        skills = [
            {"id":1,"name":"HTML5","category":"1. Languages","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"},
            {"id":2,"name":"JavaScript","category":"1. Languages","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"},
            {"id":3,"name":"TypeScript","category":"1. Languages","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"},
            {"id":4,"name":"Next.js","category":"2. Frontend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"},
            {"id":5,"name":"React.js","category":"2. Frontend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"},
            {"id":6,"name":"Redux Toolkit","category":"2. Frontend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg"},
            {"id":7,"name":"Tailwind CSS","category":"2. Frontend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"},
            {"id":8,"name":"Bootstrap","category":"2. Frontend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"},
            {"id":9,"name":"Node.js","category":"3. Backend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"},
            {"id":10,"name":"Express.js","category":"3. Backend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"},
            {"id":11,"name":"MongoDB","category":"3. Backend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"},
            {"id":12,"name":"MySQL","category":"3. Backend","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"},
            {"id":14,"name":"Photoshop","category":"4. Design","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg"},
            {"id":15,"name":"Premiere Pro","category":"4. Design","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg"},
            {"id":13,"name":"Postman","category":"4. Tools","logo":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"}
        ];

        projects = [
            {
                "id":1,
                "title":"Tasky - MERN Stack Task Manager with Glassy UI",
                "slug":"tasky-mern-glassy-ui",
                "thumbnail_url":"https://res.cloudinary.com/djrgrmvmr/image/upload/v1780066546/anand_portfolio/j6xavbw1prbnki6b3tuf.png",
                "description":"A secure full-stack task manager built with MongoDB, Express, React, and Node.js. It features a modern Glassmorphism UI using Tailwind CSS and tailwind-animate, JWT auth with bcryptjs password hashing, precise task scheduling with full status tracking, and automated email workflows via Brevo API.",
                "github_link":"https://github.com/anandgonaboyina/TaskManager_MERN_FullStack/tree/main?tab=readme-ov-file",
                "live_link":"https://task-manager-mern-full-stack.vercel.app/"
            }
        ];

        lifeMoments = [
            {
                "id":1,
                "title":"Hardware Tinkering: Modding micro-USB to Type-C",
                "image_url":"https://res.cloudinary.com/djrgrmvmr/image/upload/v1780105114/anand_portfolio/s3apgjwqk6yvvrkaohyl.jpg"
            }
        ];
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-[var(--foreground)] font-sans overflow-hidden">
            <section className="relative flex flex-col justify-center max-w-7xl mx-auto px-2 py-10 md:py-12 lg:py-16">
                {/* <FloatingParticles /> */}
                <div className="hero-blob w-72 h-72 md:w-96 md:h-96 bg-blue-400/20 top-10 left-10" />
                <div className="hero-blob w-64 h-64 md:w-80 md:h-80 bg-purple-400/20 bottom-10 right-10" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 mt-10 lg:mt-0">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <FadeIn delay={100}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                                Hi, I'm <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Anand Kumar.
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 h-10">
                                <Typewriter strings={["Full-Stack MERN Developer", "EEE Engineer @ NIT Goa", "Hardware & Software Geek"]} />
                            </h2>
                        </FadeIn>

                        <FadeIn delay={500}>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                I bridge the gap between hardware and software.
                                By day, I study Electrical and Electronics Engineering at NIT Goa.
                                By night, I am a passionate full-stack web developer building high-performance,
                                secure applications with a strict focus on data integrity and RBAC architecture.
                            </p>
                        </FadeIn>

                        <FadeIn delay={700} className="flex flex-col gap-6 justify-center lg:justify-start pt-4">
                            {/* Top row: View Work and Hire Me side by side */}
                            <div className="flex flex-row gap-3 sm:gap-5 justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0 mt-2">
                                <Link href="/projects" className="group relative inline-flex items-center justify-center px-4 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white bg-gray-900 rounded-full overflow-hidden transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] flex-1">
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></span>
                                    <span className="relative flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap">
                                        View Works
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                    </span>
                                </Link>
                                <a href="mailto:anandgonaboyina@gmail.com" className="group inline-flex items-center justify-center px-4 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200/80 rounded-full transition-all hover:bg-white hover:border-gray-300 hover:scale-[1.03] shadow-sm hover:shadow-md flex-1">
                                    <span className="flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap">
                                        Hire Me
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </span>
                                </a>
                            </div>

                            {/* Bottom row: Connect */}
                            <div className="flex items-center justify-center lg:justify-start gap-4">
                                <span className="text-gray-500 font-bold text-sm uppercase tracking-wider hidden sm:block">Connect:</span>
                                <div className="flex items-center gap-4">
                                    <a href="https://www.linkedin.com/in/anand-kumar-gonaboyina-b63946378" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-full text-gray-500 hover:text-blue-700 hover:border-blue-400 hover:bg-blue-50 transition duration-300 shadow-sm" title="LinkedIn">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a href="https://t.me/gAnandKumar" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-full text-gray-500 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition duration-300 shadow-sm" title="Telegram">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.youtube.com/@anandnitg" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-full text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition duration-300 shadow-sm" title="YouTube">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21.582 6.186a2.665 2.665 0 00-1.876-1.888C17.95 3.8 12 3.8 12 3.8s-5.95 0-7.706.498A2.7 2.7 0 002.418 6.186C1.92 7.952 1.92 12 1.92 12s0 4.048.498 5.814a2.665 2.665 0 001.876 1.888c1.756.498 7.706.498 7.706.498s5.95 0 7.706-.498a2.665 2.665 0 001.876-1.888C22.08 16.048 22.08 12 22.08 12s0-4.048-.498-5.814zM9.99 15.48V8.52L15.918 12 9.99 15.48z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <FadeIn delay={200} direction="left" className="flex-shrink-0 relative">
                        <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative z-10">
                            <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 avatar-ring" />
                            <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white shadow-2xl avatar-pulse bg-gray-200">
                                <img src="/profile.jpeg" alt="Anand Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </FadeIn>
                </div>


            </section>


            <section className="relative bg-white py-12 md:py-16 border-y border-gray-100 z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">My Tech Stack</h2>
                            <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-8">
                        {skills.length === 0 ? (
                            <p className="col-span-full text-center text-gray-400 py-10">No skills added yet.</p>
                        ) : (
                            skills.map((skill, index) => (
                                <FadeIn key={skill.id} delay={index * 50} direction="up">
                                    <div className="flex flex-col items-center gap-2 h-full">
                                        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all">
                                            {skill.logo ? (
                                                <img src={skill.logo} alt={skill.name} className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <div className="w-full h-full text-blue-600 flex items-center justify-center font-bold text-2xl">
                                                    {skill.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-gray-700 text-xs md:text-sm text-center line-clamp-1">{skill.name}</h3>
                                    </div>
                                </FadeIn>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section className="relative bg-gray-50 py-12 md:py-16 z-10 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn>
                        <div className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 text-center md:text-left">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-extrabold mb-4">My Realtime Websites & Projects</h2>
                                <div className="h-1 w-24 bg-blue-600 mx-auto md:mx-0 rounded-full" />
                            </div>
                            <Link href="/projects" className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1 mb-2">
                                View All Projects &rarr;
                            </Link>
                        </div>
                    </FadeIn>

                    <div className="-mx-6 px-6 md:mx-0 md:px-0">
                        {projects.length === 0 ? (
                            <p className="text-gray-400">No projects added yet.</p>
                        ) : (
                            <AutoSlider interval={4000}>
                                {projects.map((project, i) => (
                                    <div key={project.id} className="snap-center w-[85vw] sm:w-[340px] md:w-[400px] flex-shrink-0 flex">
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </AutoSlider>
                        )}
                    </div>
                </div>
            </section>


            <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 z-10">
                <FadeIn>
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">College Life & Beyond Coding</h2>
                        <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-6" />
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            My journey isn't just behind a standard IDE.
                            From grinding circuits in the EEE labs and flashing custom Android ROMs
                            (rooting & OS tinkering), to capturing beautiful days with my crazy family.
                            I love exploring the absolute limits of technology
                        </p>
                    </div>
                </FadeIn>


                {lifeMoments.length === 0 ? (
                    <p className="text-center w-full text-gray-400">No moments uploaded yet.</p>
                ) : (
                    <div className="-mx-6 px-6 md:mx-0 md:px-0">
                        <AutoSlider interval={4000}>
                            {lifeMoments.map((moment: any, i: number) => (
                                <div key={moment.id || i} className="snap-center flex-shrink-0">
                                    <div className="gallery-photo w-[200px] h-[260px] md:w-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg relative group">
                                        <img
                                            src={moment.image_url}
                                            alt={moment.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                                            <h3 className="text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                {moment.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </AutoSlider>
                    </div>
                )}
            </section>
        </div>
    );
}