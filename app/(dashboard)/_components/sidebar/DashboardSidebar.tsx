import DashboardWrapper from './DashBoardWrapper'
import DashboardNavigation from './DashboardNavigation'
import DashboardToggle from './DashboardToggle'

export default function DashboardSidebar() {
  return (
    <div>
      <DashboardWrapper>
        <DashboardToggle />
        <DashboardNavigation />
      </DashboardWrapper>
    </div>
  )
}


