import React from "react";

const MessageContext = React.createContext([])

const MessageProvider = MessageContext.Provider
const MessageConsumer = MessageContext.Consumer

export {MessageProvider, MessageConsumer}