import {useCallback, useMemo, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useMainNavigate} from '~/shared/route';

export function useBottomSheetController(snapList = ['25%', '50%', '75%', '93%']) {
  const ref = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => snapList, []);
  const openBottomSheet = useCallback(() => {
    ref.current?.present();
  }, []);
  const closeBottomSheet = useCallback(() => {
    ref.current?.dismiss();
  }, []);
  const extendBottomSheet = useCallback(() => {
    ref.current?.expand();
  }, []);

  return {ref, openBottomSheet, closeBottomSheet, snapPoints, extendBottomSheet};
}
