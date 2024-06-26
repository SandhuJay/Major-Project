import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { useSelector } from "react-redux"
export default function App() {
    const data = useSelector(state => state.root);
    const username = data.userInfo.firstname + "" + data.userInfo.lastname;
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    useEffect(() => {
        const apiKey = "5b305af5-2b71-4975-869d-39db5d7f195d";
        let meetingId = id;

        const config = {
            name: username,
            meetingId: meetingId,
            apiKey: apiKey,

            region: "sg001",

            containerId: null,
            redirectOnLeave: "http://localhost:5000",

            micEnabled: true,
            webcamEnabled: true,
            participantCanToggleSelfWebcam: true,
            participantCanToggleSelfMic: true,
            participantCanLeave: true,

            chatEnabled: true,
            screenShareEnabled: true,
            pollEnabled: true,
            whiteboardEnabled: true,
            raiseHandEnabled: true,

            recording: {
                autoStart: true,
                enabled: true,
                webhookUrl: "https://www.videosdk.live/callback",
                awsDirPath: `/meeting-recordings/${meetingId}/`,
            },

            livestream: {
                autoStart: true,
                enabled: true,
            },

            layout: {
                type: "SPOTLIGHT",
                priority: "PIN",
            },

            branding: {
                enabled: true,
                logoURL:
                    "https://static.zujonow.com/videosdk.live/videosdk_logo_circle_big.png",
                name: "Prebuilt",
                poweredBy: false,
            },

            permissions: {
                pin: true,
                askToJoin: false, // Ask joined participants for entry in meeting
                toggleParticipantMic: true, // Can toggle other participant's mic
                toggleParticipantWebcam: true, // Can toggle other participant's webcam
                drawOnWhiteboard: true, // Can draw on whiteboard
                toggleWhiteboard: true, // Can toggle whiteboard
                toggleRecording: true, // Can toggle meeting recording
                toggleLivestream: true, //can toggle live stream
                removeParticipant: true, // Can remove participant
                endMeeting: true, // Can end meeting
                changeLayout: true, //can change layout
            },

            joinScreen: {
                visible: true, // Show the join screen ?
                title: "Join Through Link", // Meeting title
                meetingUrl: window.location.href, // Meeting joining url
            },

            leftScreen: {

                actionButton: {
                    label: "Video SDK Live",
                    href: "https://videosdk.live/",
                },

            },

            notificationSoundEnabled: true,

            debug: true,

            maxResolution: "sd",


        };

        const meeting = new VideoSDKMeeting();
        meeting.init(config);
    }, [id]);
    id += 1;

    return <div></div>;
}