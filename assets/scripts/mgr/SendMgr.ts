import { LoginVerifyCmd, LoginVerifySubCmd } from "../net/cmd/CmdData";
import { encodeLoginVerify, LoginVerify } from "../net/protocol/LoginVerify";
import { encodeMyExternalMessage } from "../net/protocol/MyExternalMessage";
import SocketClient from "../net/socket/SocketClient";
import CmdMgr from "./CmdMgr";

export default class SendMgr {

  public static LoginVerify(data: LoginVerify = null) {
    data = {
      jwt: "test"
    }
    let msg: Uint8Array = encodeLoginVerify(data);
    this.send(CmdMgr.getMergeCmd(LoginVerifyCmd, LoginVerifySubCmd), msg);
    // SocketClient.ins.send(LoginVerifyCmd, LoginVerifySubCmd, msg)
  }

  public static send(mergeCmd: number, data: Uint8Array, cmdCode: number = 1, protocolSwitch: number = 0) {
    let msg = {
      cmdCode: cmdCode,
      protocolSwitch: protocolSwitch,
      cmdMerge: mergeCmd,
      responseStatus: 0,
      validMsg: "",
      dataContent: data
    }
    SocketClient.ins.send(encodeMyExternalMessage(msg));
  }
}
