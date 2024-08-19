import { AppearanceProvider } from "./appearance/Appearance"
import { LayoutProvider } from "./appearance/Layout"
import { ClockProvider } from "./general/ClockContext"
import { GreetingProvider } from "./general/GreetingContext"
import { TodosProvider } from "./general/TodosContext"
import { UserInfoProvider } from "./general/UserInfoContext"
import { Integrations } from "./integrations/Integrations"
import { Shortcuts } from "./shortcuts/Shortcuts"
import TimerProvider from "./timer/TimerProvider"
import { WeatherProvider } from "./weather/WeatherProvider"

export default function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <GreetingProvider>
        <UserInfoProvider>
          <TodosProvider>
            <WeatherProvider>
              <TimerProvider>
                <AppearanceProvider>
                  <Shortcuts>
                    <Integrations>
                      <ClockProvider>{children}</ClockProvider>
                    </Integrations>
                  </Shortcuts>
                </AppearanceProvider>
              </TimerProvider>
            </WeatherProvider>
          </TodosProvider>
        </UserInfoProvider>
      </GreetingProvider>
    </LayoutProvider>
  )
}
