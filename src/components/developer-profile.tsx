import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, FileText, Twitter } from "lucide-react"

export function DeveloperProfile() {
  return (
    <div className="space-y-6 p-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>About the Developer</CardTitle>
          <CardDescription>
            Meet the person behind this application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Matija Žiberna</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm a passionate full-stack developer and entrepreneur with over 5 years of experience 
                in marketing, business development, and web development. Self-taught coder and co-founder 
                of We Hate Copy Pasting, where we solve software problems for direct-to-consumer businesses.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  🚀 Current Focus
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Building solutions for D2C brands with Next.js and TypeScript
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://github.com/matija2209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ziberna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://medium.com/@matijazib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <FileText className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/ziberna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative w-full aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden">
                <img 
                  src="https://www.buildwithmatija.com/_next/image?url=%2Fmatija-ziberna_portrait.jpeg&w=1080&q=75" 
                  alt="Matija Ziberna Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DeveloperProfile 