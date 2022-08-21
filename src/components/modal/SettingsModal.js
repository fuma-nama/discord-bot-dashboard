import Modal from "./Modal";
import Settings from "../card/Settings";

export function SettingsModal({isOpen, onClose}) {

    return <Modal isOpen={isOpen} onClose={onClose} header={{zh: "用戶設置", en: "Settings"}}>
        <Settings />
    </Modal>
}