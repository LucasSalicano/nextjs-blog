function DarkTheme() {
   return (
       <style jsx global>
           {`
          /* Dark Theme */
          :root {
            --background-color: black;
            --text-color: white;
            --link-color: darkgray;
          }
        `}
       </style>
   );
}

export default DarkTheme;