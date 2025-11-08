import { useEffect } from "react";
import chatbotIcon from "../../src/images/logoteam1.jpeg";
import botAvatar from "../../src/images/custumerServis.png";
import userAvatar from "../../src/images/proyek.png";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";

    script.onload = () => {
      if (!window.Chatbot) return;

      window.Chatbot.init({
        chatflowid: "640916b0-4338-456e-a4f0-0e1a69d196a0",
        apiHost: "https://cloud.flowiseai.com",
        chatflowConfig: {},
        observersConfig: {},

        theme: {
          button: {
            backgroundColor: "#1B3C53",
            right: 20,
            bottom: 20,
            size: 56,
            dragAndDrop: true,
            iconColor: "white",
            customIconSrc: chatbotIcon,
            autoWindowOpen: {
              autoOpen: false,
              openDelay: 3,
              autoOpenOnMobile: false,
            },
          },

          disclaimer: {
            title: "Syarat & Ketentuan",
            message:
              'Dengan menggunakan chatbot ini, Anda menyetujui <a target="_blank" href="https://flowiseai.com/terms">Ketentuan Penggunaan</a>.',
            textColor: "#2C2C2C",
            buttonColor: "#1B3C53",
            buttonText: "Mulai Chat",
            buttonTextColor: "#FFFFFF",
            blurredBackgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundColor: "white",
          },

          chatWindow: {
            showTitle: true,
            title: "Asisten Virtual",
            titleAvatarSrc: chatbotIcon,
            welcomeMessage: "Halo! 👋 Ada yang bisa saya bantu hari ini?",
            backgroundColor: "#F4F4F4",
            height: 520,
            width: 420,
            fontSize: 15,
            starterPrompts: ["Apa itu pelatihan K3?", "berapa harga termurah pelatihan ini?"],
            starterPromptFontSize: 14,
            clearChatOnReload: false,
            sourceDocsTitle: "Referensi:",
            renderHTML: true,

            botMessage: {
              backgroundColor: "#E9EFF6",
              textColor: "#1B3C53",
              showAvatar: true,
              avatarSrc: botAvatar,
            },

            userMessage: {
              backgroundColor: "#1B3C53",
              textColor: "#FFFFFF",
              showAvatar: true,
              avatarSrc: userAvatar,
            },

            textInput: {
              placeholder: "Ketik pertanyaan Anda di sini...",
              backgroundColor: "#FFFFFF",
              textColor: "#2C2C2C",
              sendButtonColor: "#1B3C53",
              maxChars: 100,
              maxCharsWarningMessage:
                "Maksimal 100 karakter ya.",
              autoFocus: true,
              sendMessageSound: true,
              sendSoundLocation: "/sounds/send_message.mp3",
              receiveMessageSound: true,
              receiveSoundLocation: "/sounds/receive_message.mp3",
            },

            feedback: {
              color: "#1B3C53",
            },

            dateTimeToggle: {
              date: true,
              time: true,
            },

            footer: {
              textColor: "#555",
              text: "💡 Dibuat oleh Tim 1 | Powered by Flowise",
            },
          },
        },
      });
    };

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return null;
};

export default Chatbot;





// import { useEffect } from "react";

// const Chatbot = () => {
//   useEffect(() => {
//     // Dynamically load the Flowise script
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
//     script.onload = () => {
//       // Wait for the script to load then initialize chatbot
//       window.Chatbot.init({
//         chatflowid: "640916b0-4338-456e-a4f0-0e1a69d196a0",
//         apiHost: "https://cloud.flowiseai.com",
//         chatflowConfig: {},
//         observersConfig: {},
//         theme: {
//           button: {
//             backgroundColor: "#1B3C53",
//             right: 20,
//             bottom: 20,
//             size: 48,
//             dragAndDrop: true,
//             iconColor: "white",
//             customIconSrc:
//               "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
//             autoWindowOpen: {
//               autoOpen: true,
//               openDelay: 2,
//               autoOpenOnMobile: false,
//             },
//           },
  
//           disclaimer: {
//             title: "Disclaimer",
//             message:
//               'By using this chatbot, you agree to the <a target="_blank" href="https://flowiseai.com/terms">Terms & Condition</a>',
//             textColor: "black",
//             buttonColor: "#3b82f6",
//             buttonText: "Start Chatting",
//             buttonTextColor: "white",
//             blurredBackgroundColor: "rgba(0, 0, 0, 0.4)",
//             backgroundColor: "white",
//           },
//           chatWindow: {
//             showTitle: true,
//             showAgentMessages: true,
//             title: "Flowise Bot",
//             titleAvatarSrc:
//               "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
//             welcomeMessage: "Hello! Ada yang bisa saya bantu?",
//             errorMessage: "This is a custom error message",
//             backgroundColor: "#D2C1B6",
//             height: 500,
//             width: 400,
//             fontSize: 16,
//             starterPrompts: ["Apa itu K3?", "Berapa harga termurah?"],
//             starterPromptFontSize: 15,
//             clearChatOnReload: false,
//             sourceDocsTitle: "Sources:",
//             renderHTML: true,
//             botMessage: {
//               backgroundColor: "#f7f8ff",
//               textColor: "#303235",
//               showAvatar: true,
//               avatarSrc:
//                 "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
//             },
//             userMessage: {
//               backgroundColor: "#3B81F6",
//               textColor: "#ffffff",
//               showAvatar: true,
//               avatarSrc:
//                 "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
//             },
//             textInput: {
//               placeholder: "Type your question",
//               backgroundColor: "#ffffff",
//               textColor: "#303235",
//               sendButtonColor: "#3B81F6",
//               maxChars: 50,
//               maxCharsWarningMessage:
//                 "You exceeded the characters limit. Please input less than 50 characters.",
//               autoFocus: true,
//               sendMessageSound: true,
//               sendSoundLocation: "send_message.mp3",
//               receiveMessageSound: true,
//               receiveSoundLocation: "receive_message.mp3",
//             },
//             feedback: {
//               color: "#303235",
//             },
//             dateTimeToggle: {
//               date: true,
//               time: true,
//             },
//             footer: {
//               textColor: "#303235",
//               text: "Powered by Team 1",
//               // company: "Flowise",
//               // companyLink: "https://flowiseai.com",
//             },
//           },
//         },
//       });
//     };

//     document.body.appendChild(script);

//     // Cleanup
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null; // Komponen ini tidak menampilkan apa pun langsung di UI
// };

// export default Chatbot;
