"use client";


import * as icons from "@/Icons";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/navbar/page";
import { Button } from "@/components/ui/button";

export default function StoryBook() {

  const sections = [
    {
      name: "Icons",
      content: (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {Object.entries(icons).map(([key, icon]) => (
              <div key={key} className="flex space-x-2 items-center border p-2">
                {icon({ className: "h-6 w-6" })}
                <span> {key}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 mb-2">Example usage:</p>
          <code>{`import { UploadDocIcon } from "@/Icons";`}</code>
          <br />
          <code>{`<UploadDocIcon className="h-6 w-6" />`}</code>
        </>
      ),
    },
    {
      name: "Buttons",
      content: (
        <div className="flex flex-wrap space-x-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="default" 
        //   loading
          >
            Default with loader
          </Button>
        </div>
      ),
    },
    {
      name: "Inputs",
      content: (
        <>
          <div className="grid gap-2 grid-cols-3">
            <Input placeholder="Default" />
            <Input placeholder="Password" type="password" />
            <Input
              className="text-[#828994]"
            //   leftIcon={icons.MessageIcon({
            //     className: "w-6 h-6",
            //   })}
              placeholder="Left icon"
            />
            <Input
              className="text-[#828994]"
            //   rightIcon={icons.DeleteIcon({ className: "w-6 h-6" })}
              placeholder="Right icon"
            />
            <Input
              type="password"
              className="text-[#828994]"
            //   leftIcon={icons.MessageIcon({
            //     className: "w-6 h-6",
            //   })}
              placeholder="Left and right icons"
            />
            <Input placeholder="Disabled" disabled />
            <Input
              placeholder="With error"
            //   subtext="An error occurred"
            //   hasError
            />
          </div>
          {/* <SearchInput
            className="w-[350px] py-1"
            setSearchText={setSearchText}
          />  */}
        </>
      ),
    },

    {
      name: "NavBar",
      content: <NavBar />,
    },


  ];
  return (
    <div className="pb-20">
      <div className="hidden lg:block h-screen overflow-y-auto fixed inset-y-0">
        <ul className="w-80 py-10 text-xl">
          {sections.map((section) => (
            <li
              key={section.name}
              className="flex items-center w-full px-4 hover:bg-accent"
            >
              {/* <a
                href={`#${section.name.split(" ").join("").toLowerCase()}`}
                className="w-full block py-3"
              >
                {section.name}
              </a> */}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:ml-[344px] py-10">
        {sections.map((section) => (
          <section
            key={section.name}
            id={section.name.split(" ").join("").toLowerCase()}
            className="mt-16 border p-4"
          >
            <h3 className="text-xl font-mono tracking-wider underline text font-bold mb-3">
              {section.name}
            </h3>
            {section.content}
          </section>
        ))}
      </div>
      {/* <div>
        <PageTitle pageTitle="Edit Profile" icon />
      </div> */}
    </div>
  );
}


