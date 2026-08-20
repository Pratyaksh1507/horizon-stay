import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { Users } from "lucide-react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  const effectivePrice = regularPrice - (discount || 0);

  return (
    <Table.Row>
      {/* Thumbnail */}
      <div className="relative group/thumb overflow-hidden rounded-xl w-20 h-14 border border-zinc-800 flex-shrink-0">
        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/cabin-001.jpg";
          }}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover/thumb:scale-110"
        />
      </div>

      {/* Cabin Name */}
      <div className="font-bold text-zinc-100 text-[1.55rem]">
        Cabin <span className="font-mono text-amber-400">{name}</span>
      </div>

      {/* Capacity */}
      <div className="flex items-center gap-1.5 text-zinc-400 text-[1.3rem]">
        <Users className="w-4 h-4 text-zinc-500" />
        <span>Up to {maxCapacity} guests</span>
      </div>

      {/* Pricing with Discount */}
      <div className="flex flex-col">
        <span className="font-bold text-zinc-100 text-[1.5rem] tabular-nums">
          {formatCurrency(effectivePrice)}
          <span className="text-[1.2rem] font-normal text-zinc-500 ml-1">/night</span>
        </span>
        {discount > 0 && (
          <span className="text-zinc-500 line-through text-[1.15rem] tabular-nums">
            {formatCurrency(regularPrice)}
          </span>
        )}
      </div>

      {/* Discount Badge */}
      <div>
        {discount ? (
          <span className="px-2.5 py-1 rounded-md text-[1.15rem] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            -${discount} Off
          </span>
        ) : (
          <span className="text-zinc-600 text-[1.3rem]">&mdash;</span>
        )}
      </div>

      {/* Action Menu */}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
