import PageBase from "../components/PageBase";
import SplitBill from "../components/SplitBill";
import { FriendsProvider } from "../contexts/FriendsContext";

export default function Splitter() {
  return (
    <PageBase type="top">
      <FriendsProvider>
        <SplitBill />
      </FriendsProvider>
    </PageBase>
  );
}
