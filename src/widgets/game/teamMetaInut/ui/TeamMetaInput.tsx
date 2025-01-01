import styled from 'styled-components/native';
import {NumberInput} from '~/shared/ui';
import {useTeamMetaStore} from '~/features/game/teamMetaStore/model/useTeamMetaStore.ts';
import {useValidGameMeta} from '~/widgets/game/teamMetaInut/model/useValidGameMeta.ts';

export const TeamMetaInput = () => {
  const {courtError} = useValidGameMeta();
  const {meta, setCourtName} = useTeamMetaStore();
  return (
    <StyledContainer>
      <NumberInput name={'코트 지정'} value={meta.courtNumber} onChangeNumber={setCourtName} errorMessage={courtError} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 10px 20px;
  gap: 16px;
`;
