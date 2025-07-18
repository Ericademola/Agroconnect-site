// const FloatingButton = () => {
//   return (
//     <div className="md:hidden">
//             <div className="fixed bottom-24 right-6">
//               <div className="relative">
//                 <div
//                   className={cn(
//                     "transition duration-200 right-6",
//                     showButtons ? "-translate-y-24 opacity-100" : "opacity-0"
//                   )}
//                 >
//                   <div className="flex flex-col gap-7">
//                     <div
//                       className="text-left flex items-center gap-2 justify-end"
//                       onClick={handlePromotionNav}
//                     >
//                       <p className="text-base lg:font-semibold mr-2 text-white">
//                         Promotions
//                       </p>
//                       <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-white">
//                         <MicIcon className="w-6 h-6" />
//                       </span>
//                     </div>
//                     <div
//                       className="text-left flex items-center gap-2 justify-end"
//                       onClick={handleStoryNav}
//                     >
//                       <p className="text-base lg:font-semibold lg:text-xl mr-2 text-white">
//                         Stories
//                       </p>
//                       <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-white">
//                         <ImageIcon className="w-6 h-6" />
//                       </span>
//                     </div>
//                     <div
//                       className="text-left flex items-center gap-2 justify-end"
//                       onClick={handlePostNav}
//                       // onClick={openModalFromSidebar}
//                     >
//                       <p className="text-base lg:font-semibold lg:text-xl mr-2 text-white">
//                         Posts
//                       </p>
//                       <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-white">
//                         <EditIcon className="w-6 h-6" />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   size="icon"
//                   className="w-12 h-12 hover:shadow-2xl absolute bottom-0 right-0"
//                   onClick={() => setShowButtons(!showButtons)}
//                 >
//                   <AddIcon
//                     className={cn(
//                       "transition-transform duration-200",
//                       showButtons
//                         ? "w-10 h-10 text-white rotate-45"
//                         : "w-10 h-10 text-white rotate-0"
//                     )}
//                   />
//                 </Button>
//               </div>
//             </div>
//           </div>
//   )
// }
// export default FloatingButton