(function() {
    // Get runtime
    let runtime = cr_getC2Runtime();

    // Util stuff
    let notify = (title, text, image = "./speedrunner.png") => {
        cr.plugins_.sirg_notifications.prototype.acts.AddSimpleNotification.call(
            runtime.types_by_index.find(
                (type) => type.plugin instanceof cr.plugins_.sirg_notifications
            ).instances[0],
            title,
            text,
            image
        );
    };

    let playerType = runtime.types_by_index.find(
        (x) =>
        !!x.animations &&
        x.animations[0].frames[0].texture_file.includes("collider")
    );

    let textType = runtime.types_by_index.find(
        (x) =>
        x.name === "TextAlign" ||
        (x.plugin instanceof cr.plugins_.TextModded &&
            x.vars_count === 8 &&
            !x.is_family)
    );

    let ghostArrType = runtime.types_by_index.find(
        (x) => x.plugin instanceof cr.plugins_.Arr && x.default_instance[5][1] === 6
    );

    let globalType = runtime.types_by_index.find(
        (x) =>
        x.plugin instanceof cr.plugins_.Globals && x.instvar_sids.length === 24
    );

    let getPlayer = () =>
        playerType.instances.filter(
            (x) => x.instance_vars[17] === "" && x.behavior_insts[0].enabled
        )[0];

    let getFlag = () =>
        runtime.types_by_index.find(
            (x) =>
            x.name === "EndFlag" ||
            (x.plugin instanceof cr.plugins_.Sprite &&
                x.all_frames &&
                x.all_frames[0].texture_file.includes("endflag"))
        ).instances[0];

    let addScript = (src, id, onload) => {
        if (document.getElementById(id)) return;
        let fjs = document.getElementsByTagName("script")[0];
        let js = document.createElement("script");
        js.id = id;
        fjs.parentNode.insertBefore(js, fjs);
        js.onload = onload;
        js.src = src;
    };

    let curLayout = runtime.running_layout.name;

    // Multiplayer methods

    const DATA_TYPES = {
        PLAYER_DATA: "PLAYER_DATA",
        HOST_DATA: "HOST_DATA",
        CHAT: "CHAT",
    };

    let multiplayer = {
        init() {
            // Init code
            notify("Mod loaded", "Multiplayer mod loaded");

            this.username = "";
            this.usernameInsts = null;
            this.connections = [];
            this.initDomUI();
            this.updateDomContainers();
            this.updateDomUsername();
            this.chat = [];
            this.initialised = true;
            this.hostKey = "";
            this.fakeId = "";

            runtime.tickMe(this);

            this.initWorker();

            globalThis.ovoMultiplayerClient = this;
        },

        initWorker() {
            this.worker = new Worker(
                "data:text/javascript;base64,77u/InVzZSBzdHJpY3QiOw0KDQp2YXIgdGltZXJfaWQgPSAtMTsNCnZhciB0aW1lcl9ydW5uaW5nID0gZmFsc2U7DQoNCmZ1bmN0aW9uIHN0YXJ0VGltZXIoKQ0Kew0KCWlmICh0aW1lcl9ydW5uaW5nKQ0KCQlyZXR1cm47DQoJDQoJdGltZXJfcnVubmluZyA9IHRydWU7DQoJdGltZXJfaWQgPSBzZXRJbnRlcnZhbCh0aWNrLCAxNik7DQp9Ow0KDQpmdW5jdGlvbiBzdG9wVGltZXIoKQ0Kew0KCWlmICghdGltZXJfcnVubmluZykNCgkJcmV0dXJuOw0KCQ0KCXRpbWVyX3J1bm5pbmcgPSBmYWxzZTsNCgljbGVhckludGVydmFsKHRpbWVyX2lkKTsNCgl0aW1lcl9pZCA9IC0xOw0KfTsNCg0KZnVuY3Rpb24gdGljaygpDQp7DQoJaWYgKCF0aW1lcl9ydW5uaW5nKQ0KCQlyZXR1cm47DQoJDQoJc2VsZi5wb3N0TWVzc2FnZSgidGljayIpOw0KfTsNCg0Kc2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24gKGUpDQp7DQoJdmFyIGNtZCA9IGUuZGF0YTsNCgkNCglpZiAoIWNtZCkNCgkJcmV0dXJuOw0KCQ0KCWlmIChjbWQgPT09ICJzdGFydCIpDQoJew0KCQlzdGFydFRpbWVyKCk7DQoJfQ0KCWVsc2UgaWYgKGNtZCA9PT0gInN0b3AiKQ0KCXsNCgkJc3RvcFRpbWVyKCk7DQoJfQ0KCQ0KfSwgZmFsc2UpOw=="
            );
            this.wakerWorker = new Worker("waker.js");

            this.wakerWorker.addEventListener(
                "message",
                function(e) {
                    if (e.data === "tick" && runtime.isSuspended) {
                        runtime.tick(true);
                    }
                },
                false
            );

            this.wakerWorker.postMessage("");

            runtime.addSuspendCallback((s) => {
                // Suspending and is currently host: use a web worker to keep the game alive
                if (s) {
                    this.wakerWorker.postMessage("start");
                }
                // Resuming and is currently host: stop using web worker to keep running, will revert to rAF
                else {
                    this.wakerWorker.postMessage("stop");
                }
            });
        },
        startOfLayout() {
            if (!this.initialised) return;
            this.usernameInsts = null;
            this.connections.forEach((connection) => {
                connection.player = null;
            });
            // remove all players instances from memory
            if (!getFlag()) {
                // not in a level, do nothing?
            } else {
                // in a level, create other players
                this.connections.forEach((connection) => {
                    if (connection.data)
                        connection.player = this.createGhostPlayer(connection.data);
                });
            }
        },

        updateDomUsername() {
            let text = document.getElementById("ovo-multiplayer-username");
            if (text) text.innerText = "Username: " + this.username;
        },

        initDomUI() {
            // inject button css
            let style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = `
       .ovo-multiplayer-button {
          background-color: white;
          border: solid;
          border-color: black;
          border-width: 6px;
          font-family: "Retron2000";
          position: absolute;
          z-index: 2;
          cursor: pointer;
        }
        .ovo-multiplayer-button:hover {
          background-color: rgba(200, 200, 200, 1);
        }
        .ovo-multiplayer-text-box {
          background-color: #d7d7d74d;
          border: solid;
          border-color: black;
          border-width: 6px;
          font-family: "Retron2000";
          position: absolute;
          z-index: 2;
        }
        .ovo-multiplayer-text-box:hover {
          background-color: #ffffffd7;
        }
        .ovo-multiplayer-chat-input {
          background-color: white;
          border: solid;
          border-color: black;
          border-width: 6px;
          font-family: "Retron2000";
          position: absolute;
          z-index: 2;
        }
      `;
            document.head.appendChild(style);

            // user interface with create room button, join room button, set username button and chat box
            let container = document.createElement("div");
            container.id = "ovo-multiplayer-container";
            container.style.position = "absolute";
            container.style.top = "0";
            container.style.left = "0";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.backgroundColor = "rgba(0,0,0,0)";
            container.style.zIndex = "2";

            //text displaying current room id and user name at the bottom right corner
            let text = document.createElement("p");
            text.id = "ovo-multiplayer-username";
            text.style.position = "absolute";
            text.style.bottom = "0";
            text.style.right = "0";
            text.style.backgroundColor = "white";
            text.style.zIndex = "2";
            text.style.fontSize = "20px";
            text.style.color = "black";
            text.style.textAlign = "right";
            text.style.paddingRight = "10px";
            text.style.paddingBottom = "4px";
            text.style.fontFamily = "Retron2000";
            this.updateDomUsername();
            container.appendChild(text);

            //first container, only visible when not in a room
            let disconnectedContainer = document.createElement("div");
            disconnectedContainer.id = "ovo-multiplayer-disconnected-container";
            disconnectedContainer.style.position = "absolute";
            disconnectedContainer.style.top = "0";
            disconnectedContainer.style.left = "0";
            disconnectedContainer.style.width = "100%";
            disconnectedContainer.style.height = "100%";
            disconnectedContainer.style.backgroundColor = "rgba(0,0,0,0)";
            disconnectedContainer.style.zIndex = "2";
            container.appendChild(disconnectedContainer);
            this.connectContainer = disconnectedContainer;

            let createRoomButton = document.createElement("button");
            createRoomButton.innerText = "Create Room";
            //apply common style
            createRoomButton.classList.add("ovo-multiplayer-button");
            createRoomButton.style.bottom = "0";
            createRoomButton.style.left = "0";
            createRoomButton.style.width = "100px";
            createRoomButton.style.height = "50px";
            createRoomButton.onclick = () => {
                this.createRoom();

                //remove focus from button
                createRoomButton.blur();
            };
            disconnectedContainer.appendChild(createRoomButton);

            let joinRoomButton = document.createElement("button");
            joinRoomButton.innerText = "Join Room";
            //apply common style
            joinRoomButton.classList.add("ovo-multiplayer-button");
            joinRoomButton.style.bottom = "0";
            joinRoomButton.style.left = "100px";
            joinRoomButton.style.width = "100px";
            joinRoomButton.style.height = "50px";
            joinRoomButton.onclick = () => {
                //prompt for room code
                let roomCode = prompt("Room code");
                if (roomCode) this.joinRoom(roomCode);

                //remove focus from button
                joinRoomButton.blur();
            };
            disconnectedContainer.appendChild(joinRoomButton);

            let setUsernameButton = document.createElement("button");
            setUsernameButton.innerText = "Set Username";
            //apply common style
            setUsernameButton.classList.add("ovo-multiplayer-button");
            setUsernameButton.style.bottom = "0";
            setUsernameButton.style.left = "200px";
            setUsernameButton.style.width = "100px";
            setUsernameButton.style.height = "50px";
            setUsernameButton.onclick = () => {
                //prompt user for username
                let username = prompt("Enter new username", this.username);
                if (username) this.setUsername(username);

                //remove focus from button
                setUsernameButton.blur();
            };
            disconnectedContainer.appendChild(setUsernameButton);

            // other container, only visible when connected to a room
            let connectedContainer = document.createElement("div");
            connectedContainer.id = "ovo-multiplayer-other-container";
            connectedContainer.style.position = "absolute";
            connectedContainer.style.top = "0";
            connectedContainer.style.left = "0";
            connectedContainer.style.width = "100%";
            connectedContainer.style.height = "100%";
            connectedContainer.style.backgroundColor = "rgba(0,0,0,0)";
            connectedContainer.style.zIndex = "10";
            container.appendChild(connectedContainer);
            this.connectedContainer = connectedContainer;

            let leaveRoomButton = document.createElement("button");
            leaveRoomButton.innerText = "Leave Room";
            //apply common style
            leaveRoomButton.classList.add("ovo-multiplayer-button");
            leaveRoomButton.style.bottom = "0";
            leaveRoomButton.style.left = "0";
            leaveRoomButton.style.width = "100px";
            leaveRoomButton.style.height = "50px";
            leaveRoomButton.onclick = () => {
                this.leaveRoom();

                //remove focus from button
                leaveRoomButton.blur();
            };
            connectedContainer.appendChild(leaveRoomButton);

            //copy room code button
            let copyRoomCodeButton = document.createElement("button");
            copyRoomCodeButton.innerText = "Copy Room Code";
            //apply common style
            copyRoomCodeButton.classList.add("ovo-multiplayer-button");
            copyRoomCodeButton.style.bottom = "0";
            copyRoomCodeButton.style.left = "100px";
            copyRoomCodeButton.style.width = "100px";
            copyRoomCodeButton.style.height = "50px";
            copyRoomCodeButton.onclick = () => {
                this.copyRoomCode();

                //remove focus from button
                copyRoomCodeButton.blur();
            };
            connectedContainer.appendChild(copyRoomCodeButton);

            // set username button
            let setUsernameButton2 = document.createElement("button");
            setUsernameButton2.innerText = "Set Username";
            //apply common style
            setUsernameButton2.classList.add("ovo-multiplayer-button");
            setUsernameButton2.style.bottom = "0";
            setUsernameButton2.style.left = "200px";
            setUsernameButton2.style.width = "100px";
            setUsernameButton2.style.height = "50px";
            setUsernameButton2.onclick = () => {
                //prompt user for username
                let username = prompt("Enter new username", this.username);
                if (username) this.setUsername(username);

                //remove focus from button
                setUsernameButton2.blur();
            };
            connectedContainer.appendChild(setUsernameButton2);

            //show chat messages in a read only text area
            let chatBox = document.createElement("textarea");
            chatBox.id = "ovo-multiplayer-chat-box";
            //apply common style
            chatBox.classList.add("ovo-multiplayer-text-box");
            chatBox.style.border = "none";
            chatBox.style.padding = "6px";
            chatBox.style.bottom = "102px";
            chatBox.style.color = "black";
            chatBox.style.left = "0";
            chatBox.style.width = "388px";
            chatBox.style.height = "200px";
            chatBox.style.resize = "none";
            chatBox.style.textShadow = "0 0 5px white";
            chatBox.style.fontWeight = "bold";
            chatBox.placeholder = "No chat messages yet...";
            chatBox.style.overflow = "hidden";
            chatBox.style.textAlign = "left";
            // prevent default on scroll
            chatBox.onscroll = (e) => {
                e.preventDefault();
            };
            //prevent default on mousewheel
            chatBox.onmousewheel = (e) => {
                e.preventDefault();
            };
            connectedContainer.appendChild(chatBox);

            let chatInput = document.createElement("textarea");
            chatInput.id = "ovo-multiplayer-chat-input";
            //apply common style
            chatInput.classList.add("ovo-multiplayer-chat-input");
            chatInput.style.bottom = "50px";
            chatInput.style.left = "0";
            chatInput.style.width = "388px";
            chatInput.style.height = "40px";
            chatInput.placeholder = "Type here...";
            chatInput.style.resize = "none";
            chatInput.style.display = "none";
            chatInput.onkeydown = (e) => {
                if (e.key === "Enter") {
                    this.sendChat({
                        username: this.username,
                        message: chatInput.value,
                    });

                    //wait for a bit before clearing the input
                    setTimeout(() => {
                        chatInput.value = "";
                        chatInput.blur();
                        container.style.backgroundColor = "rgba(0,0,0,0)";
                        chatInput.style.display = "none";
                    }, 100);
                }
                e.stopPropagation();
            };
            connectedContainer.appendChild(chatInput);

            let chatButton = document.createElement("button");
            chatButton.innerText = "Chat (Enter)";
            //apply common style
            chatButton.classList.add("ovo-multiplayer-button");
            chatButton.style.bottom = "0";
            chatButton.style.left = "300px";
            chatButton.style.width = "100px";
            chatButton.style.height = "50px";
            let toggleChatBox = () => {
                //do nothing if not connected to room
                if (!this.connectedToRoom) return;

                if (chatInput.value) {
                    this.sendChat({
                        username: this.username,
                        message: chatInput.value,
                    });

                    //wait for a bit before clearing the input
                    setTimeout(() => {
                        chatInput.value = "";
                        chatInput.blur();
                        container.style.backgroundColor = "rgba(0,0,0,0)";
                        chatInput.style.display = "none";
                    }, 100);
                }

                if (chatInput.style.display === "none") {
                    chatBox.style.display = "block";
                    chatInput.style.display = "block";
                    container.style.backgroundColor = "rgba(0,0,0,0.5)";
                    setTimeout(() => {
                        chatInput.focus();
                    }, 100);
                } else {
                    chatInput.style.display = "none";
                    chatInput.blur();
                    container.style.backgroundColor = "rgba(0,0,0,0)";
                }
            };
            chatButton.onclick = () => {
                toggleChatBox();
                //remove focus from button
                chatButton.blur();
            };
            // open chatbox on T key only if chatInput is not focused
            document.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && chatInput.style.display === "none") {
                    toggleChatBox();
                }
            });
            connectedContainer.appendChild(chatButton);

            document.body.appendChild(container);

            // a button at the top left corner that toggles the entire UI
            let toggleButton = document.createElement("button");
            toggleButton.id = "ovo-multiplayer-toggle-button";
            toggleButton.innerText = "";
            // little globe icon in the button
            let globeIcon = document.createElement("img");
            // use web icon from material design icons
            globeIcon.src =
                "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE2LjM2LDE0QzE2LjQ0LDEzLjM0IDE2LjUsMTIuNjggMTYuNSwxMkMxNi41LDExLjMyIDE2LjQ0LDEwLjY2IDE2LjM2LDEwSDE5Ljc0QzE5LjksMTAuNjQgMjAsMTEuMzEgMjAsMTJDMjAsMTIuNjkgMTkuOSwxMy4zNiAxOS43NCwxNE0xNC41OSwxOS41NkMxNS4xOSwxOC40NSAxNS42NSwxNy4yNSAxNS45NywxNkgxOC45MkMxNy45NiwxNy42NSAxNi40MywxOC45MyAxNC41OSwxOS41Nk0xNC4zNCwxNEg5LjY2QzkuNTYsMTMuMzQgOS41LDEyLjY4IDkuNSwxMkM5LjUsMTEuMzIgOS41NiwxMC42NSA5LjY2LDEwSDE0LjM0QzE0LjQzLDEwLjY1IDE0LjUsMTEuMzIgMTQuNSwxMkMxNC41LDEyLjY4IDE0LjQzLDEzLjM0IDE0LjM0LDE0TTEyLDE5Ljk2QzExLjE3LDE4Ljc2IDEwLjUsMTcuNDMgMTAuMDksMTZIMTMuOTFDMTMuNSwxNy40MyAxMi44MywxOC43NiAxMiwxOS45Nk04LDhINS4wOEM2LjAzLDYuMzQgNy41Nyw1LjA2IDkuNCw0LjQ0QzguOCw1LjU1IDguMzUsNi43NSA4LDhNNS4wOCwxNkg4QzguMzUsMTcuMjUgOC44LDE4LjQ1IDkuNCwxOS41NkM3LjU3LDE4LjkzIDYuMDMsMTcuNjUgNS4wOCwxNk00LjI2LDE0QzQuMSwxMy4zNiA0LDEyLjY5IDQsMTJDNCwxMS4zMSA0LjEsMTAuNjQgNC4yNiwxMEg3LjY0QzcuNTYsMTAuNjYgNy41LDExLjMyIDcuNSwxMkM3LjUsMTIuNjggNy41NiwxMy4zNCA3LjY0LDE0TTEyLDQuMDNDMTIuODMsNS4yMyAxMy41LDYuNTcgMTMuOTEsOEgxMC4wOUMxMC41LDYuNTcgMTEuMTcsNS4yMyAxMiw0LjAzTTE4LjkyLDhIMTUuOTdDMTUuNjUsNi43NSAxNS4xOSw1LjU1IDE0LjU5LDQuNDRDMTYuNDMsNS4wNyAxNy45Niw2LjM0IDE4LjkyLDhNMTIsMkM2LjQ3LDIgMiw2LjUgMiwxMkExMCwxMCAwIDAsMCAxMiwyMkExMCwxMCAwIDAsMCAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWiIgLz48L3N2Zz4=";
            globeIcon.style.width = "38px";
            globeIcon.style.height = "38px";
            toggleButton.appendChild(globeIcon);
            //apply common style
            toggleButton.classList.add("ovo-multiplayer-button");
            toggleButton.style.top = "0";
            toggleButton.style.left = "0";
            toggleButton.style.width = "50px";
            toggleButton.style.height = "50px";
            toggleButton.style.zIndex = "9999999999";
            toggleButton.onclick = () => {
                // on first click, prompt for username
                if (this.username === "") {
                    let username = prompt("Please enter your username");
                    if (username === "") {
                        username = "OvO Player";
                    } else if (!username) {
                        return;
                    }
                    // set username
                    this.setUsername(username);
                }
                container.style.display =
                    container.style.display === "none" ? "block" : "none";
                notify(
                    "OvO Multiplayer",
                    "OvO Multiplayer is now " +
                    (container.style.display === "none" ? "hidden" : "visible")
                );
                //remove focus from button when clicked
                toggleButton.blur();
            };
            // set containter style to none
            container.style.display = "none";
            document.body.appendChild(toggleButton);
        },

        copyRoomCode() {
            let roomCode;
            if (!this.connectedToRoom) return;
            if (this.isHost) {
                roomCode = "Code: " + this.peer.id;
            } else {
                roomCode = "Code: " + this.conn.peer;
            }
            if (this.fakeId) {
                roomCode += ", Shortened Code: " + this.fakeId;
            }
            if (roomCode) {
                let textArea = document.createElement("textarea");
                textArea.value = roomCode;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                textArea.remove();
                notify("Room code copied to clipboard");
            }
        },

        tick() {
            if (!this.initialised) return;
            let player = getPlayer();
            if (player && getFlag()) {
                if (!this.usernameInsts) {
                    this.usernameInsts = this.createUsernameInstances(
                        player.layer,
                        player.x,
                        player.y,
                        this.username
                    );
                }

                this.updateUsernamePosition(
                    this.usernameInsts,
                    player.x - 100,
                    player.y - 55,
                    this.username
                );
            }

            if (this.connectedToRoom) {
                this.destroyNonPlayerGhosts();
                this.connections.forEach((connection) => {
                    if (!connection.data) return;
                    if (!connection.player) {
                        connection.player = this.createGhostPlayer(connection.data);
                    } else if (connection.data.layout !== curLayout) {
                        //destroy player
                        this.destroyGhostPlayer(connection.player);
                        connection.player = null;
                    } else {
                        this.loadPlayerData(connection.player, connection.data);
                    }
                });
                if (this.isHost) {
                    let otherData = {};
                    this.connections.forEach((connection) => {
                        otherData[connection.id] = connection.data;
                    });
                    //add my data with my id to other data
                    otherData[this.peer.id] = this.getMyData();

                    //send all player data you received
                    this.connections.forEach((connection) => {
                        connection.conn.send({
                            type: DATA_TYPES.HOST_DATA,
                            payload: otherData,
                        });
                    });
                } else {
                    //send only your player data
                    this.conn.send({
                        type: DATA_TYPES.PLAYER_DATA,
                        payload: this.getMyData(),
                    });
                }
            }
        },

        updateUsernamePosition(usernames, x, y, username) {
            usernames[0].x = x - 2;
            usernames[0].y = y;
            usernames[0].text = username;
            usernames[0].updateFont();
            usernames[0].set_bbox_changed();
            usernames[1].x = x + 2;
            usernames[1].y = y;
            usernames[1].text = username;
            usernames[1].updateFont();
            usernames[1].set_bbox_changed();
            usernames[2].x = x;
            usernames[2].y = y - 2;
            usernames[2].text = username;
            usernames[2].updateFont();
            usernames[2].set_bbox_changed();
            usernames[3].x = x;
            usernames[3].y = y + 2;
            usernames[3].text = username;
            usernames[3].updateFont();
            usernames[3].set_bbox_changed();
            usernames[4].x = x;
            usernames[4].y = y;
            usernames[4].text = username;
            usernames[4].updateFont();
            usernames[4].set_bbox_changed();
        },

        updateDomContainers() {
            if (this.connectedToRoom) {
                this.connectedContainer.style.display = "block";
                this.connectContainer.style.display = "none";
            } else {
                this.connectedContainer.style.display = "none";
                this.connectContainer.style.display = "block";
            }
        },

        setUsername(name) {
            this.username = name;
            if (this.usernameInsts)
                this.usernameInsts.forEach((inst) => {
                    inst.text = name;
                    inst.updateFont();
                });
            this.updateDomUsername();
        },

        sendChat(data) {
            if (!this.connectedToRoom || data.message.trim() === "") return;
            this.pushChat({
                    message: data.message,
                    username: data.username,
                    timestamp: Date.now(),
                    id: this.peer.id,
                    skin: globalType.instances[0].instance_vars[8],
                },
                true
            );
        },

        updateChatBox() {
            let chatBox = document.getElementById("ovo-multiplayer-chat-box");
            chatBox.value = "";
            this.chat.forEach((chat) => {
                chatBox.value += `${chat.username}: ${chat.message}\n`;
            });
            //scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight;
        },

        pushChat(data, transmit = false) {
            data.message = data.message.toString().replace(/<[^>]*>/g, '');

            // forward chat if host
            if (this.isHost) {
                this.chat.push({
                    username: data.username,
                    message: data.message,
                    id: data.id,
                    skin: data.skin,
                    timestamp: data.timestamp,
                });
                this.updateChatBox();
                this.maybeNotifyChat(data);
                this.connections.forEach((connection) => {
                    connection.conn.send({
                        type: DATA_TYPES.CHAT,
                        payload: data,
                    });
                });
            } else if (transmit) {
                this.conn.send({
                    type: DATA_TYPES.CHAT,
                    payload: data,
                });
            } else {
                this.chat.push({
                    username: data.username,
                    message: data.message,
                    id: data.id,
                    skin: data.skin,
                    timestamp: data.timestamp,
                });
                this.updateChatBox();
                this.maybeNotifyChat(data);
            }
        },

        maybeNotifyChat(data) {
            if (data.id === this.peer.id) return;
            notify(
                data.username,
                data.message,
                `${data.skin === "" ? "default" : data.skin}.png`
            );
        },

        createRoom() {
            this.connectedToRoom = true;
            this.isHost = true;
            this.chat = [];
            // this.peer = new Peer(undefined, {
            //   host: "localhost",
            //   port: 9000,
            //   path: "/",
            //   secure: false,
            //   debug: 3,
            // });
            this.peer = new Peer();
            this.peer.on("open", (id) => {
                // Show the ID on screen and allow players to copy it;
                console.log("My peer ID is: " + id);
                notify("Room created", "My peer ID is: " + id);

                let createRequest = new XMLHttpRequest();
                createRequest.open("GET", "https://ovo-room-shortener.glitch.me/create?realId=" + id);
                createRequest.onreadystatechange = () => {
                    if (createRequest.readyState == 4 && createRequest.status == 200) {
                        let createRoomResponse = JSON.parse(createRequest.responseText);
                        this.fakeId = createRoomResponse.fakeId;
                        this.hostKey = createRoomResponse.hostKey;

                        console.log("My peer short ID is: " + this.fakeId);
                        notify("Room created", "My peer short ID is: " + this.fakeId);
                    }
                };
                createRequest.send();

                this.updateDomContainers();
            });
            this.peer.on("connection", (conn) => {
                let myConnObject = {
                    conn,
                    id: conn.peer,
                    data: null,
                    player: null,
                };
                let myId = this.connections.length;
                this.connections.push(myConnObject);

                notify(
                    "Player joined",
                    `${myConnObject?.data?.username ?? "New player"} joined`
                );
                conn.on("open", () => {
                    // Receive messages
                    conn.on("data", (data) => {
                        if (data.type === DATA_TYPES.CHAT) {
                            this.pushChat(data.payload, true);
                        } else if (data.type === DATA_TYPES.PLAYER_DATA) {
                            myConnObject.data = data.payload;
                            // create/delete/update player
                        }
                    });
                    let closeConn = () => {
                        notify(
                            "Player disconnected",
                            `${myConnObject?.data?.username ?? "Player"} left`
                        );
                        this.destroyGhostPlayer(myConnObject.player);
                        delete this.connections[myId];
                    };
                    conn.on("close", closeConn);
                    conn.on("error", closeConn);
                });
            });
        },

        joinRoom(roomId) {
            this.isHost = false;
            // this.peer = new Peer(undefined, {
            //   host: "localhost",
            //   port: 9000,
            //   path: "/",
            //   secure: false,
            //   debug: 3,
            // });
            this.peer = new Peer();
            this.peer.on("open", (id) => {
                if (!(/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/gm.test(roomId))) {
                    let roomRequest = new XMLHttpRequest();
                    roomRequest.open("GET", "https://ovo-room-shortener.glitch.me/get?fakeId=" + roomId, false);

                    try {
                        roomRequest.send();
                    } catch (error) {
                        return;
                    }

                    roomId = JSON.parse(roomRequest.responseText).realId;
                    this.fakeId = roomId;
                } else {
                    let roomRequest = new XMLHttpRequest();
                    roomRequest.open("GET", "https://ovo-room-shortener.glitch.me/get?realId=" + roomId);
                    roomRequest.onStateChange = () => {
                        if (roomRequest.readyState == 4 && roomRequest.status == 200) {
                            this.fakeId = JSON.parse(roomRequest.responseText).fakeId;
                            notify("Joined room", "Connected to shortened room " + this.fakeId);
                        }
                    }
                    roomRequest.send();
                }

                this.conn = this.peer.connect(roomId);

                this.conn.on("open", () => {
                    this.connectedToRoom = true;
                    this.updateDomContainers();
                    notify("Joined room", "Connected to room " + roomId);
                    // Receive messages
                    this.conn.on("data", (data) => {
                        if (data.type === DATA_TYPES.HOST_DATA) {
                            //update other players besides me
                            let otherData = data.payload;
                            Object.keys(otherData).forEach((id) => {
                                if (id === this.peer.id) return;
                                let connection = this.connections.find(
                                    (connection) => connection.id === id
                                );
                                let playerData = otherData[id];
                                if (!connection) {
                                    connection = {
                                        id: id,
                                        data: playerData,
                                        player: null,
                                    };
                                    this.connections.push(connection);

                                    notify("Player joined", `${connection.data.username} joined`);
                                } else {
                                    connection.data = playerData;
                                }
                                //create player if needed
                                if (!connection.player) {
                                    connection.player = this.createGhostPlayer(playerData);
                                } else if (playerData.layout !== curLayout) {
                                    //destroy player
                                    this.destroyGhostPlayer(connection.player);
                                    connection.player = null;
                                } else {
                                    this.loadPlayerData(connection.player, playerData);
                                }
                            });
                        } else if (data.type === DATA_TYPES.CHAT) {
                            console.log(data);
                            this.pushChat(data.payload, false);
                        }
                    });
                    let closeConn = () => {
                        this.peer.destroy();

                        notify(
                            "Connection lost",
                            "Host left the room, or you left the room"
                        );
                        // destroy all other players
                        this.connections.forEach((connection) => {
                            this.destroyGhostPlayer(connection.player);
                        });
                        this.connections = [];
                    };
                    this.conn.on("close", closeConn);
                });
            });
        },

        leaveRoom() {
            if (!this.peer) return;

            if (this.isHost) {
                let removeRequest = new XMLHttpRequest();
                removeRequest.open("GET", "https://ovo-room-shortener.glitch.me/remove?fakeId=" + this.fakeId + "&hostKey=" + this.hostKey);
                removeRequest.send();
            }

            this.fakeId = "";
            this.isHost = false;
            this.connectedToRoom = false;
            this.peer.destroy();
            this.peer = null;
            this.conn = null;
            this.connections.forEach((connection) => {
                this.destroyGhostPlayer(connection.player);
            });
            this.connections = [];
            this.updateDomContainers();
            notify("Left room");
        },

        onPlayerUpdate() {},

        onPlayerDisconnect() {},

        onPlayerConnect(conn) {},

        getMyData() {
            let player = getPlayer();
            if (!player)
                return {
                    layout: curLayout,
                    skin: globalType.instances[0].instance_vars[8],
                    username: this.username,
                };
            return {
                x: player.x,
                y: player.y,
                angle: player.angle,
                state: player.instance_vars[0],
                layout: curLayout,
                layer: player.layer.name,
                username: this.username,
                side: player.instance_vars[2],
                skin: player.instance_vars[12],
                frame: player.cur_frame,
            };
        },

        destroyGhostPlayer(player) {
            if (!player) return;
            if (player.instance) {
                player.instance.siblings.forEach((sibling) => {
                    cr.behaviors.SkymenSkin.prototype.acts.UseDefault.call(
                        sibling.behaviorSkins[0]
                    );
                });
                runtime.DestroyInstance(player.instance);
            }
            if (player.usernames)
                player.usernames.forEach((username) => {
                    runtime.DestroyInstance(username);
                });
        },

        destroyNonPlayerGhosts() {
            if (!getFlag()) return;
            let ghosts = playerType.instances.filter(
                (x) => x.instance_vars[16] && x.instance_vars[17] !== ""
            );
            if (!ghosts) return;
            ghosts.forEach((ghost) => {
                runtime.DestroyInstance(ghost);
                ghost.siblings.forEach((sibling) => {
                    cr.behaviors.SkymenSkin.prototype.acts.UseDefault.call(
                        sibling.behaviorSkins[0]
                    );
                });
            });
            let ghostArr = ghostArrType.instances[0];
            ghostArr.setSize(0, ghostArr.cy, ghostArr.cz);
            runtime.eventsheets.Player.events[2].subevents[2].subevents[1].actions.length = 0;
        },

        createGhostPlayer(data) {
            if (data.layout !== curLayout) return null;
            let layer = runtime.running_layout.layers.find(
                (layer) => layer.name === data.layer
            );
            if (!layer) return null;
            this.destroyNonPlayerGhosts();
            let instance = runtime.createInstance(playerType, layer, data.x, data.y);
            instance.visible = false;
            instance.instance_vars[16] = 1;
            instance.instance_vars[17] = "";
            instance.instance_vars[12] = data.skin;
            setTimeout(() => {
                if (!getFlag()) return;
                instance.siblings.forEach((sibling) => {
                    if (data.skin === "") {
                        cr.behaviors.SkymenSkin.prototype.acts.UseDefault.call(
                            sibling.behaviorSkins[0]
                        );
                    } else {
                        cr.behaviors.SkymenSkin.prototype.acts.SetSkin.call(
                            sibling.behaviorSkins[0],
                            data.skin
                        );
                    }
                });
            }, 200);

            let usernames = this.createUsernameInstances(
                layer,
                data.x - 100,
                data.y - 55,
                data.username
            );
            return {
                instance,
                usernames
            };
        },

        createUsernameInstances(layer, x, y, username) {
            let ret = [];

            let inst = runtime.createInstance(textType, layer, x - 2, y);
            inst.text = username;
            inst.height = 25;
            inst.width = 200;
            inst.facename = "Retron2000";
            inst.halign = 50;
            inst.valign = 50;
            inst.color = "rgb(0,0,0)";
            inst.fontstyle = "bold";
            inst.updateFont();
            inst.set_bbox_changed();
            ret.push(inst);

            inst = runtime.createInstance(textType, layer, x + 2, y);
            inst.text = username;
            inst.height = 25;
            inst.width = 200;
            inst.facename = "Retron2000";
            inst.halign = 50;
            inst.valign = 50;
            inst.color = "rgb(0,0,0)";
            inst.fontstyle = "bold";
            inst.updateFont();
            inst.set_bbox_changed();
            ret.push(inst);

            inst = runtime.createInstance(textType, layer, x, y - 2);
            inst.text = username;
            inst.height = 25;
            inst.width = 200;
            inst.facename = "Retron2000";
            inst.halign = 50;
            inst.valign = 50;
            inst.color = "rgb(0,0,0)";
            inst.fontstyle = "bold";
            inst.updateFont();
            inst.set_bbox_changed();
            ret.push(inst);

            inst = runtime.createInstance(textType, layer, x, y + 2);
            inst.text = username;
            inst.height = 25;
            inst.width = 200;
            inst.facename = "Retron2000";
            inst.halign = 50;
            inst.valign = 50;
            inst.color = "rgb(0,0,0)";
            inst.fontstyle = "bold";
            inst.updateFont();
            inst.set_bbox_changed();
            ret.push(inst);

            inst = runtime.createInstance(textType, layer, x, y);
            inst.text = username;
            inst.height = 25;
            inst.width = 200;
            inst.facename = "Retron2000";
            inst.halign = 50;
            inst.valign = 50;
            inst.color = "rgb(255,255,255)";
            inst.fontstyle = "";
            inst.updateFont();
            inst.set_bbox_changed();
            ret.push(inst);

            return ret;
        },

        loadPlayerData(player, data) {
            if (data.layout !== curLayout) return;
            this.updateUsernamePosition(
                player.usernames,
                data.x - 100,
                data.y - 55,
                data.username
            );
            player.instance.x = data.x;
            player.instance.y = data.y;
            player.instance.angle = data.angle;
            player.instance.instance_vars[0] = data.state;
            player.instance.instance_vars[2] = data.side;
            if (data.side > 0) {
                c2_callFunction("Player > Unmirror", [player.instance.uid]);
            }
            if (data.side < 0) {
                c2_callFunction("Player > Mirror", [player.instance.uid]);
            }
            cr.plugins_.Sprite.prototype.acts.SetAnimFrame.call(
                player.instance,
                data.frame
            );
            player.instance.y = data.y;
            player.instance.set_bbox_changed();
        },
    };

    // Override layout code to instantiate distant players if any
    Object.values(runtime.layouts).forEach((layout) => {
        let oldFn = layout.startRunning.bind(layout);
        layout.startRunning = () => {
            oldFn();
            curLayout = layout.name;
            multiplayer.startOfLayout();
        };
    });

    addScript(
        "https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js",
        "peerJs",
        multiplayer.init.bind(multiplayer)
    );
})();